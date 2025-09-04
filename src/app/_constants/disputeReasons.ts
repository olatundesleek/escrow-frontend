interface disputeReason {
  value: string;
  label: string;
}

export const disputeReasons: disputeReason[] = [
  { value: 'non_delivery', label: 'Non-delivery of goods or services' },
  { value: 'not_as_described', label: 'Goods or services not as described' },
  { value: 'payment_not_received', label: 'Payment not received' },
  { value: 'quality_issues', label: 'Quality issues with goods or services' },
  { value: 'delay_in_delivery', label: 'Delay in delivery' },
  { value: 'fraud', label: 'Fraud or misrepresentation' },
  { value: 'breach_of_contract', label: 'Breach of contract terms' },
  { value: 'unauthorized_changes', label: 'Unauthorized changes to agreement' },
  { value: 'unresponsive_counterparty', label: 'Counterparty unresponsive' },
  {
    value: 'refund_disagreement',
    label: 'Disagreement over refund or compensation',
  },
  {
    value: 'escrow_not_completed',
    label: 'Service rendered / Package delivered but escrow not completed',
  },
  {
    value: 'others',
    label: 'Others',
  },
];
