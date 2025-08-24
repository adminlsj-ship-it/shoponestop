export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SvJZWyBaWJTxBT',
    priceId: 'price_1RzSwSHTB8RnY8rerhgt1Xz9',
    name: 'PRO PLAN',
    description: 'Reduced 3.00% credit card processing rate, Automatic enrollment in marketing features, New Client Deliveries (automated marketing system), All premium booking and analytics features',
    mode: 'subscription',
    price: 26.99,
  },
  {
    id: 'prod_SvJmhhXNVCrzTK',
    priceId: 'price_1RzT8UHTB8RnY8rev9M21Xiv',
    name: 'Product Pro PLAN',
    description: 'Dedicated product sales platform. Unlimited product listings. No sales volume limits. Advanced listing tools. Product advertising options. Marketing automation',
    mode: 'subscription',
    price: 32.99,
  },
  {
    id: 'prod_SvJgJY7pyXppCK',
    priceId: 'price_1RzT2tHTB8RnY8reUHmvMi6T',
    name: 'Enterprise',
    description: 'Premium + Product Sales ($15.99 add-on) Complete business solution',
    mode: 'subscription',
    price: 45.98,
  },
  {
    id: 'prod_SvJkq8kWcSbJi9',
    priceId: 'price_1RzT71HTB8RnY8renohr2reQ',
    name: 'Individual Seller - $0.99 per item',
    description: '*Pay-per-sale model *No monthly subscription fee *Minimum: 10 items sold per month. *Warning: Store deactivated 30 days if minimum not met. *Basic listing tools',
    mode: 'subscription',
    price: 0.99,
  },
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}

export function getProductById(id: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.id === id);
}