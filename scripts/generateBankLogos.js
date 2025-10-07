import fs from 'fs';
import path from 'path';

const PAYSTACK_URL = `https://api.paystack.co/bank?currency=NGN`;
const NIGERIAN_LOGOS_API = 'https://nigerianbanklogos.xyz/api/json';
const LOGO_DIR = path.join(process.cwd(), 'public', 'bank-logos');
const OUTPUT_FILE = path.join(
  process.cwd(),
  'src',
  'app',
  '_constants',
  'bankLogos.ts',
);

console.log('Paystack URL:', PAYSTACK_URL);
console.log('Nigerian Logos API:', NIGERIAN_LOGOS_API);
console.log('Logos folder:', LOGO_DIR);
console.log('Output file:', OUTPUT_FILE);
console.log('---');

// Normalize for comparison
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Extract all possible name variations
function getNameVariations(name) {
  const variations = new Set();
  const lower = name.toLowerCase();

  // Add original normalized
  variations.add(normalize(name));

  // Remove common bank terms
  const withoutBankTerms = lower
    .replace(
      /\b(plc|limited|ltd|bank|microfinance|mfb|holdings?|holding company|mortgage|finance|trust|investment)\b/g,
      '',
    )
    .trim();
  variations.add(normalize(withoutBankTerms));

  // First word (brand name)
  const firstWord = lower.split(/\s+/)[0];
  if (firstWord && firstWord.length > 2) {
    variations.add(normalize(firstWord));
  }

  // First two words
  const words = lower.split(/\s+/);
  if (words.length >= 2) {
    variations.add(normalize(words.slice(0, 2).join(' ')));
  }

  // All significant words (3+ chars)
  words.forEach((word) => {
    const cleaned = word.replace(/[^a-z0-9]/g, '');
    if (cleaned.length >= 3) {
      variations.add(cleaned);
    }
  });

  // Handle abbreviations (e.g., "GTB" from "Guaranty Trust Bank")
  const abbrev = words
    .filter((w) => w.length > 0 && !/^(and|the|of|for)$/i.test(w))
    .map((w) => w[0])
    .join('');
  if (abbrev.length >= 2) {
    variations.add(abbrev);
  }

  return Array.from(variations).filter((v) => v.length > 0);
}

// Comprehensive known bank name mappings
const KNOWN_MAPPINGS = {
  // Major banks
  'access bank': 'accesscorp',
  'guaranty trust': 'gtco',
  gtbank: 'gtco',
  'zenith bank': 'zenithbank',
  'first bank': 'fbnh',
  'united bank for africa': 'uba',
  uba: 'uba',
  'union bank': 'unionbank',
  'fidelity bank': 'fidelity',
  'stanbic ibtc': 'stanbic',
  'sterling bank': 'sterlingbank',
  'wema bank': 'wemabank',
  'unity bank': 'unitybank',
  'polaris bank': 'polaris',
  'keystone bank': 'keystonebank',
  fcmb: 'fcmb',
  ecobank: 'ecobank',
  citibank: 'citibank',
  'heritage bank': 'heritagebank',
  'providus bank': 'providus',
  'suntrust bank': 'suntrustbank',
  'jaiz bank': 'jaizbank',
  'parallex bank': 'parallexbank',
  'titan trust': 'ttb',
  'optimus bank': 'optimusbank',
  'globus bank': 'globusbank',
  'premium trust': 'premiumtrustbank',
  'lotus bank': 'lotusbank',

  // Microfinance banks
  kuda: 'kuda',
  carbon: 'getcarbon',
  rubies: 'rubies',
  mint: 'mint',
  moniepoint: 'moniepoint',
  opay: 'opay',
  palmpay: 'palmpay',
  vfd: 'vfdmfb',
  sparkle: 'sparkle',
  eyowo: 'eyowo',
  renmoney: 'renmoney',
  paga: 'paga',
  'money master': 'moneymaster',
  coronation: 'coronation',

  // Investment/Others
  'stanbic ibtc @ease': 'stanbic',
  'taj bank': 'tajbank',
  nova: 'novamb',
  airtel: 'airtel',
  mtn: 'momo',
  '9mobile': '9mobile',
  cellulant: 'cellulant',
  payattitude: 'payattitudeonline',
  parkway: 'parkwayreadycash',
  readycash: 'parkwayreadycash',
  'sage grey': 'sagegrey',
  'mutual trust': 'mutualtrustmfb',
  covenant: 'covenantmfb',
  accion: 'accion',
  fortis: 'fortismfb',
  abc: 'abcmfb',
  'abbey mortgage': 'abbey',
  'ag mortgage': 'ag',
  infinity: 'infinity',
  'refuge mortgage': 'refugemortgagebank',
  'trust bond': 'trustbondmortgagebank',
  'living trust': 'livingtrust',
  'imperial homes': 'imperialhomesmortgagebank',
  haggai: 'haggaimortgagebanklimited',
  'platinum mortgage': 'platinummortgagebank',
  brent: 'brentmortgagebank',
  'standard chartered': 'sc',
  'rand merchant': 'rmb',
  'aso savings': 'asosavings',
  fsdh: 'fsdh',
  'nova merchant': 'nova',
  greenwich: 'greenwich',
  'fbn quest': 'fbnquest',
  rand: 'rmb',
  'coronation merchant': 'coronation',
  ffs: 'ffs',
  futureview: 'futureviewfinancialservices',
  apexloansandfinance: 'apex',
  enterprise: 'enterprise',
  ndiorah: 'ndiorah',
  addosser: 'addosser',
  nownow: 'nownow',
  advans: 'advanslamfu',
  'credit afrique': 'creditafrique',
  boctrust: 'boctrust',
  'al-barakah': 'albarakah',
  amju: 'amju',
  peace: 'peacemicrofinancebank',
  yes: 'yesmfb',
  'personal trust': 'personaltrust',
  'money trust': 'moneytrust',
  ekondo: 'ekondo',
  'e-barcs': 'ebarcs',
  trident: 'tridentmfb',
  unical: 'unical',
  gashua: 'gashua',
  'imo state': 'imostate',
  ohafia: 'ohafia',
  pennywise: 'pennywise',
  richway: 'richway',
  wetland: 'wetland',
  xslnce: 'xslnce',
};

// Score a match between bank name and logo file
function scoreMatch(bankVariations, logoName) {
  const logoNorm = normalize(logoName);
  let bestScore = 0;

  for (const variation of bankVariations) {
    // Exact match
    if (variation === logoNorm) {
      return 100;
    }

    // Check against known mappings
    for (const [key, value] of Object.entries(KNOWN_MAPPINGS)) {
      const keyNorm = normalize(key);
      const valueNorm = normalize(value);

      if (variation.includes(keyNorm) && logoNorm === valueNorm) {
        return 95;
      }
      if (keyNorm.includes(variation) && logoNorm === valueNorm) {
        return 95;
      }
    }

    // Contains match (longer strings)
    if (variation.length >= 4 && logoNorm.includes(variation)) {
      bestScore = Math.max(bestScore, 80);
    }
    if (logoNorm.length >= 4 && variation.includes(logoNorm)) {
      bestScore = Math.max(bestScore, 80);
    }

    // Starts with
    if (
      variation.length >= 3 &&
      (logoNorm.startsWith(variation) || variation.startsWith(logoNorm))
    ) {
      bestScore = Math.max(bestScore, 70);
    }
  }

  return bestScore;
}

(async () => {
  try {
    console.log('Fetching banks from Paystack...');
    const paystackRes = await fetch(PAYSTACK_URL);
    if (!paystackRes.ok)
      throw new Error(`Paystack API failed: ${paystackRes.status}`);
    const paystackData = await paystackRes.json();
    const banks = paystackData.data;
    console.log(`✓ Found ${banks.length} banks from Paystack\n`);

    console.log('Fetching bank metadata from Nigerian Bank Logos API...');
    let logoMetadata = [];
    try {
      const metaRes = await fetch(NIGERIAN_LOGOS_API);
      if (metaRes.ok) {
        logoMetadata = await metaRes.json();
        console.log(
          `✓ Found ${logoMetadata.length} banks in Nigerian Logos metadata\n`,
        );
      }
    } catch (e) {
      console.log('⚠ Could not fetch metadata, using local files only\n');
    }

    console.log('Reading local logo files...');
    const logoFiles = fs
      .readdirSync(LOGO_DIR)
      .filter((f) => /\.(svg|png|jpg|jpeg)$/i.test(f));
    console.log(`✓ Found ${logoFiles.length} logo files\n`);

    const mapping = {};
    const matched = [];
    const unmatched = [];

    console.log('Matching banks to logos...\n');

    for (const bank of banks) {
      const bankVariations = getNameVariations(bank.name);

      let bestMatch = null;
      let bestScore = 60; // Minimum threshold

      // Try matching against logo files
      for (const logoFile of logoFiles) {
        const logoName = logoFile.replace(/\.(svg|png|jpg|jpeg)$/i, '');
        const score = scoreMatch(bankVariations, logoName);

        if (score > bestScore) {
          bestScore = score;
          bestMatch = logoFile;
        }
      }

      // Also try matching against metadata titles
      for (const meta of logoMetadata) {
        const metaVariations = getNameVariations(meta.title);
        const metaFileName = meta.route.split('/').pop();

        // Check if we have this logo file locally
        if (logoFiles.some((f) => normalize(f) === normalize(metaFileName))) {
          const score = scoreMatch(
            bankVariations,
            metaFileName.replace(/\.(svg|png|jpg|jpeg)$/i, ''),
          );

          if (score > bestScore) {
            bestScore = score;
            bestMatch = metaFileName;
          }
        }
      }

      if (bestMatch) {
        mapping[bank.code] = `/bank-logos/${bestMatch}`;
        matched.push({
          bank: bank.name,
          logo: bestMatch,
          score: bestScore,
        });
      } else {
        unmatched.push(bank.name);
      }
    }

    // Generate TypeScript file
    const fileContent = `// Auto-generated by generateBankLogos.js
// Generated on: ${new Date().toISOString()}
// Matched: ${matched.length}/${banks.length} banks

export const bankLogos: Record<string, string> = ${JSON.stringify(
      mapping,
      null,
      2,
    )};
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);

    // Print summary
    console.log('='.repeat(60));
    console.log(`✅ GENERATION COMPLETE`);
    console.log('='.repeat(60));
    console.log(`Total banks: ${banks.length}`);
    console.log(
      `Matched: ${matched.length} (${(
        (matched.length / banks.length) *
        100
      ).toFixed(1)}%)`,
    );
    console.log(`Unmatched: ${unmatched.length}`);
    console.log(`Output: ${OUTPUT_FILE}`);
    console.log('='.repeat(60));

    // Show high-confidence matches
    const highConfidence = matched.filter((m) => m.score >= 90);
    if (highConfidence.length > 0) {
      console.log(`\n✓ High confidence matches (${highConfidence.length}):`);
      highConfidence.slice(0, 15).forEach((m) => {
        console.log(`  ${m.bank} → ${m.logo} (score: ${m.score})`);
      });
      if (highConfidence.length > 15) {
        console.log(`  ... and ${highConfidence.length - 15} more`);
      }
    }

    // Show medium-confidence matches
    const mediumConfidence = matched.filter(
      (m) => m.score >= 70 && m.score < 90,
    );
    if (mediumConfidence.length > 0) {
      console.log(
        `\n⚠ Medium confidence matches (${mediumConfidence.length}) - verify these:`,
      );
      mediumConfidence.slice(0, 10).forEach((m) => {
        console.log(`  ${m.bank} → ${m.logo} (score: ${m.score})`);
      });
      if (mediumConfidence.length > 10) {
        console.log(`  ... and ${mediumConfidence.length - 10} more`);
      }
    }

    // Show unmatched banks
    if (unmatched.length > 0) {
      console.log(`\n❌ Unmatched banks (${unmatched.length}):`);
      console.log('First 30:');
      unmatched.slice(0, 30).forEach((name) => {
        console.log(`  - ${name}`);
      });
      if (unmatched.length > 30) {
        console.log(`  ... and ${unmatched.length - 30} more`);
      }

      console.log('\n💡 TIP: To improve matches:');
      console.log('1. Add missing logo files to public/bank-logos/');
      console.log('2. Add custom mappings to KNOWN_MAPPINGS in the script');
      console.log('3. Check if logo filenames match bank names');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
})();
