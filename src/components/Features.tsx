
import { Shield, Zap, Users, BarChart3, Lock, Coins } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Battle-Tested Security',
    description: 'Multi-layer security with formal verification, regular audits, and insurance coverage to protect your assets.',
    gradient: 'from-green-400 to-emerald-600'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant transactions with minimal gas fees. Experience the speed of next-generation DeFi infrastructure.',
    gradient: 'from-blue-400 to-cyan-600'
  },
  {
    icon: BarChart3,
    title: 'Competitive Yields',
    description: 'Earn the highest APYs in the market with our optimized yield farming and lending algorithms.',
    gradient: 'from-purple-400 to-pink-600'
  },
  {
    icon: Users,
    title: 'Community Governed',
    description: 'Participate in protocol governance and shape the future of decentralized finance with your voice.',
    gradient: 'from-orange-400 to-red-600'
  },
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'You maintain full control of your assets. No KYC, no central authority, just pure DeFi.',
    gradient: 'from-indigo-400 to-purple-600'
  },
  {
    icon: Coins,
    title: 'Multi-Asset Support',
    description: 'Support for 50+ crypto assets including major cryptocurrencies, stablecoins, and DeFi tokens.',
    gradient: 'from-teal-400 to-green-600'
  }
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">DeFiLend</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for the future of finance with cutting-edge technology and unmatched security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="metric-card group">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
