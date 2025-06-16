
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/contexts/WalletContext';
import { 
  Bot, 
  Send, 
  Minimize2, 
  Maximize2, 
  MessageCircle, 
  TrendingUp, 
  Shield, 
  Zap,
  DollarSign,
  AlertTriangle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }>;
}

interface AILendingAssistantProps {
  onActionSuggestion?: (action: string, params: any) => void;
}

const AILendingAssistant = ({ onActionSuggestion }: AILendingAssistantProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your DeFi lending assistant. I can help you optimize your borrowing and lending strategies. Try asking me something like 'Find me the best borrowing rate' or 'Check my liquidation risk'.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useWallet();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickIntents = [
    { label: 'Best Borrow Rate', icon: TrendingUp, action: () => handleQuickIntent('Find me the best borrowing rates available') },
    { label: 'Max Borrow', icon: DollarSign, action: () => handleQuickIntent('What is the maximum I can borrow?') },
    { label: 'Liquidation Risk', icon: AlertTriangle, action: () => handleQuickIntent('Check my liquidation risk') },
    { label: 'Optimize Portfolio', icon: Zap, action: () => handleQuickIntent('How can I optimize my lending portfolio?') }
  ];

  const handleQuickIntent = (intent: string) => {
    setInputValue(intent);
    handleSendMessage(intent);
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(messageText);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('borrow') && lowerMessage.includes('rate')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Based on current market conditions, here are the best borrowing rates available:\n\n• USDC: 4.2% APR (Stablecoin pool)\n• DAI: 4.5% APR (Decentralized stable)\n• USDT: 3.8% APR (Highest liquidity)\n\nFor your risk profile, I recommend USDC with its balance of low rates and high security.",
        timestamp: new Date(),
        actions: [
          {
            label: 'Borrow USDC',
            action: () => onActionSuggestion?.('borrow', { asset: 'USDC', rate: '4.2%' })
          },
          {
            label: 'Compare All',
            action: () => onActionSuggestion?.('compare', { type: 'borrowRates' }),
            variant: 'outline'
          }
        ]
      };
    }

    if (lowerMessage.includes('max') && lowerMessage.includes('borrow')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: isConnected 
          ? "Based on your current collateral:\n\n• Available to borrow: $45,230\n• Recommended safe limit: $38,500 (85% of max)\n• Current health factor: 2.1 (Healthy)\n\nBorrowing up to the safe limit maintains a 1.5+ health factor to avoid liquidation risk."
          : "I need access to your wallet to calculate your maximum borrowing capacity. Please connect your wallet first, then I can analyze your collateral and provide personalized borrowing limits.",
        timestamp: new Date(),
        actions: isConnected ? [
          {
            label: 'Borrow Safe Max',
            action: () => onActionSuggestion?.('borrow', { amount: '$38,500', type: 'safeMax' })
          },
          {
            label: 'See Breakdown',
            action: () => onActionSuggestion?.('analyze', { type: 'borrowingPower' }),
            variant: 'outline'
          }
        ] : [
          {
            label: 'Connect Wallet',
            action: () => onActionSuggestion?.('connectWallet', {}),
            variant: 'default'
          }
        ]
      };
    }

    if (lowerMessage.includes('liquidation') || lowerMessage.includes('risk')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: isConnected
          ? "Your liquidation risk analysis:\n\n• Current health factor: 2.1 ✅\n• Liquidation price (ETH): $1,850 📊\n• Risk level: Low 🟢\n\nYou're well protected! ETH would need to drop 31% from current levels for liquidation risk. I can set up alerts to monitor this for you."
          : "Connect your wallet and I'll analyze your positions to provide real-time liquidation risk monitoring and alerts.",
        timestamp: new Date(),
        actions: isConnected ? [
          {
            label: 'Set Alert',
            action: () => onActionSuggestion?.('setAlert', { type: 'liquidation', threshold: '1.5' })
          },
          {
            label: 'Auto-Protect',
            action: () => onActionSuggestion?.('autoProtect', { enabled: true }),
            variant: 'outline'
          }
        ] : [
          {
            label: 'Connect Wallet',
            action: () => onActionSuggestion?.('connectWallet', {}),
            variant: 'default'
          }
        ]
      };
    }

    if (lowerMessage.includes('optimize') || lowerMessage.includes('portfolio')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: "I've analyzed your portfolio and found optimization opportunities:\n\n💡 **Yield Enhancement**\n• Move 30% USDC to higher-yield DAI pool (+0.3% APY)\n• Consider ETH staking rewards (+2.1% additional)\n\n⚡ **Efficiency Improvements**\n• Your LTV is conservative at 45% - you could safely increase to 60%\n• Rebalancing could free up $12,500 in borrowing power",
        timestamp: new Date(),
        actions: [
          {
            label: 'Apply Suggestions',
            action: () => onActionSuggestion?.('optimize', { type: 'yield' })
          },
          {
            label: 'Simulate Impact',
            action: () => onActionSuggestion?.('simulate', { type: 'optimization' }),
            variant: 'outline'
          }
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: "I can help you with:\n\n• Finding the best borrowing and lending rates\n• Calculating your maximum safe borrowing capacity\n• Monitoring liquidation risks and health factors\n• Optimizing your portfolio for better yields\n• Setting up automated alerts and rebalancing\n\nWhat would you like to explore?",
      timestamp: new Date()
    };
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
          size="lg"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px]">
      <Card className="h-full flex flex-col glass-card border shadow-2xl">
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Assistant
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {!isConnected && (
            <Badge variant="outline" className="bg-white/20 text-white border-white/30">
              Connect wallet for personalized advice
            </Badge>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Quick Intents */}
          <div className="p-4 border-b bg-muted/30">
            <div className="grid grid-cols-2 gap-2">
              {quickIntents.map((intent, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={intent.action}
                  className="h-auto p-2 text-xs"
                >
                  <intent.icon className="w-3 h-3 mr-1" />
                  {intent.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4" />
                      <span className="text-xs font-medium">DeFiBot</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  {message.actions && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={action.variant || 'default'}
                          onClick={action.action}
                          className="text-xs"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about lending..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage()} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AILendingAssistant;
