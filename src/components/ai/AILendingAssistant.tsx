import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useWallet } from '@/contexts/WalletContext';
import { 
  Bot, 
  Send, 
  Minimize2, 
  MessageCircle, 
  TrendingUp, 
  Shield, 
  Zap,
  DollarSign,
  AlertTriangle,
  Trash2,
  Copy,
  BarChart3,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'simulation';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }>;
  simulation?: {
    before: { yield: string; risk: string; allocation: Record<string, number> };
    after: { yield: string; risk: string; allocation: Record<string, number> };
    impact: string;
    timeline: string;
  };
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
      content: "Hi! I'm your DeFi lending assistant with advanced simulation capabilities. I can help you optimize strategies, simulate outcomes, and provide real-time analytics. Try asking me something like 'Simulate switching to aggressive strategy' or 'Show impact of increasing my lending position'.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isConnected } = useWallet();
  const { toast } = useToast();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const quickIntents = [
    { label: 'Simulate Strategy', icon: BarChart3, action: () => handleQuickIntent('Simulate switching to balanced strategy') },
    { label: 'Impact Analysis', icon: TrendingUp, action: () => handleQuickIntent('Show me the impact of optimizing my portfolio') },
    { label: 'Risk Assessment', icon: Shield, action: () => handleQuickIntent('Analyze my current risk exposure') },
    { label: 'Yield Forecast', icon: DollarSign, action: () => handleQuickIntent('Forecast my yields for the next 6 months') }
  ];

  const handleQuickIntent = useCallback((intent: string) => {
    if (isProcessing) return;
    setInputValue(intent);
    handleSendMessage(intent);
  }, [isProcessing]);

  const handleSendMessage = useCallback(async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText || isProcessing) return;

    setIsProcessing(true);
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = generateAIResponse(messageText);
      setMessages(prev => [...prev, response]);

      // If it's a simulation, add a follow-up simulation message
      if (messageText.toLowerCase().includes('simulate') || messageText.toLowerCase().includes('impact')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const simulationMessage = generateSimulationResponse(messageText);
        setMessages(prev => [...prev, simulationMessage]);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  }, [inputValue, isProcessing]);

  const generateSimulationResponse = useCallback((userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('balanced strategy') || lowerMessage.includes('switch')) {
      return {
        id: `simulation-${Date.now()}`,
        type: 'simulation',
        content: "Strategy Simulation Complete",
        timestamp: new Date(),
        simulation: {
          before: { 
            yield: "6.8%", 
            risk: "Medium", 
            allocation: { ETH: 35, USDC: 40, BTC: 15, LINK: 10 }
          },
          after: { 
            yield: "8.7%", 
            risk: "Medium", 
            allocation: { ETH: 40, USDC: 35, BTC: 15, LINK: 10 }
          },
          impact: "+$2,340 annual yield increase",
          timeline: "Implementation: 2-3 minutes, Full effect: 24-48 hours"
        },
        actions: [
          {
            label: 'Apply Strategy',
            action: () => {
              toast({
                title: "Strategy Applied",
                description: "Balanced strategy is now active with optimized allocation.",
              });
              onActionSuggestion?.('applyStrategy', { strategy: 'balanced' });
            }
          },
          {
            label: 'Detailed Report',
            action: () => onActionSuggestion?.('generateReport', { type: 'strategyComparison' }),
            variant: 'outline'
          }
        ]
      };
    }

    if (lowerMessage.includes('optimize') || lowerMessage.includes('portfolio')) {
      return {
        id: `simulation-${Date.now()}`,
        type: 'simulation',
        content: "Portfolio Optimization Analysis",
        timestamp: new Date(),
        simulation: {
          before: { 
            yield: "5.2%", 
            risk: "Low-Medium", 
            allocation: { USDC: 50, DAI: 30, ETH: 20 }
          },
          after: { 
            yield: "7.1%", 
            risk: "Medium", 
            allocation: { ETH: 35, USDC: 35, AAVE: 20, LINK: 10 }
          },
          impact: "+$4,890 projected annual increase",
          timeline: "Gradual rebalancing over 7 days to minimize slippage"
        },
        actions: [
          {
            label: 'Start Optimization',
            action: () => {
              toast({
                title: "Optimization Started",
                description: "Portfolio rebalancing initiated with gradual execution.",
              });
              onActionSuggestion?.('startOptimization', {});
            }
          }
        ]
      };
    }

    // Default simulation
    return {
      id: `simulation-${Date.now()}`,
      type: 'simulation',
      content: "Risk Impact Simulation",
      timestamp: new Date(),
      simulation: {
        before: { 
          yield: "6.3%", 
          risk: "Medium", 
          allocation: { ETH: 40, USDC: 35, BTC: 15, LINK: 10 }
        },
        after: { 
          yield: "8.9%", 
          risk: "Medium-High", 
          allocation: { ETH: 45, AAVE: 25, UNI: 20, LINK: 10 }
        },
        impact: "+$3,250 potential annual gain with 15% higher volatility",
        timeline: "Recommended implementation over 5 days"
      }
    };
  }, [toast, onActionSuggestion]);

  const generateAIResponse = useCallback((userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('simulate') && lowerMessage.includes('strategy')) {
      return {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: "🔍 **Running Strategy Simulation...**\n\nI'm analyzing the impact of switching to the balanced strategy on your portfolio. This includes:\n\n• Current vs projected yields\n• Risk assessment changes\n• Optimal rebalancing timeline\n• Gas cost estimation\n• Liquidity impact analysis\n\nSimulation results coming up next...",
        timestamp: new Date()
      };
    }

    if (lowerMessage.includes('impact') && (lowerMessage.includes('optimize') || lowerMessage.includes('portfolio'))) {
      return {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: "📊 **Portfolio Impact Analysis in Progress...**\n\nCalculating optimization opportunities:\n\n• Yield enhancement potential\n• Risk-adjusted returns\n• Diversification improvements\n• Capital efficiency gains\n• Transaction cost analysis\n\nDetailed simulation follows...",
        timestamp: new Date()
      };
    }

    if (lowerMessage.includes('risk') && lowerMessage.includes('assess')) {
      return {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: isConnected
          ? "🛡️ **Real-time Risk Assessment**\n\n**Current Risk Profile:**\n• Overall Risk Score: 6.2/10 (Medium)\n• Liquidation Distance: 31% buffer\n• Correlation Risk: Low (well diversified)\n• Smart Contract Risk: Medium (3 protocols)\n• Market Risk: Medium (crypto exposure)\n\n**Risk Mitigation Active:**\n✅ Stop-loss at health factor 1.8\n✅ Diversification across 4 assets\n✅ Conservative LTV ratio (65%)\n\n*Next risk review scheduled in 6 hours*"
          : "Connect your wallet for personalized risk assessment with real-time monitoring and automated alerts."
        ,
        timestamp: new Date(),
        actions: isConnected ? [
          {
            label: 'Set Risk Alerts',
            action: () => onActionSuggestion?.('setRiskAlerts', {})
          },
          {
            label: 'Adjust Risk Profile',
            action: () => onActionSuggestion?.('adjustRisk', {}),
            variant: 'outline'
          }
        ] : []
      };
    }

    if (lowerMessage.includes('yield') && lowerMessage.includes('forecast')) {
      return {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: "📈 **6-Month Yield Forecast Analysis**\n\n**Conservative Scenario (70% probability):**\n• Current strategy: 5.2% → 6.1% APY\n• Projected earnings: $8,400\n\n**Optimistic Scenario (20% probability):**\n• With optimization: 8.7% → 11.2% APY\n• Projected earnings: $14,200\n\n**Factors considered:**\n• Historical protocol performance\n• Market volatility trends\n• Liquidity pool dynamics\n• Upcoming protocol upgrades\n\n**Recommendation:** Gradual shift toward balanced strategy could increase forecast by 35%",
        timestamp: new Date(),
        actions: [
          {
            label: 'Enable Auto-Optimization',
            action: () => {
              toast({
                title: "Auto-Optimization Enabled",
                description: "AI will continuously optimize for better yields while managing risk.",
              });
              onActionSuggestion?.('enableAutoOpt', {});
            }
          },
          {
            label: 'Custom Forecast',
            action: () => onActionSuggestion?.('customForecast', {}),
            variant: 'outline'
          }
        ]
      };
    }

    // Enhanced default response
    return {
      id: `assistant-${Date.now()}`,
      type: 'assistant',
      content: "🤖 **Advanced AI Assistant Ready**\n\nI provide:\n\n**🔮 Simulations & Predictions**\n• Strategy impact analysis\n• Yield forecasting (1-12 months)\n• Risk scenario modeling\n\n**📊 Real-time Analytics**\n• Portfolio optimization\n• Market opportunity alerts\n• Performance tracking\n\n**⚡ Smart Automation**\n• Dynamic rebalancing\n• Risk management\n• Yield farming optimization\n\nWhat would you like to explore?",
      timestamp: new Date(),
      actions: [
        {
          label: 'Start Simulation',
          action: () => handleQuickIntent('Simulate portfolio optimization')
        },
        {
          label: 'Market Analysis',
          action: () => handleQuickIntent('Analyze current market opportunities'),
          variant: 'outline'
        }
      ]
    };
  }, [isConnected, onActionSuggestion, handleQuickIntent, toast]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const clearChat = useCallback(() => {
    setMessages([{
      id: '1',
      type: 'assistant',
      content: "Chat cleared! Ready to help with simulations and strategy optimization.",
      timestamp: new Date()
    }]);
    toast({
      title: "Chat Cleared",
      description: "Your conversation history has been cleared.",
    });
  }, [toast]);

  const copyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Message copied to clipboard",
    });
  }, [toast]);

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg animate-pulse"
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
              AI Assistant Pro
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-white hover:bg-white/20 p-2"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
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
              Connect wallet for simulations
            </Badge>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
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
                  disabled={isProcessing}
                >
                  <intent.icon className="w-3 h-3 mr-1" />
                  {intent.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[85%] group">
                  <div
                    className={`p-3 rounded-lg whitespace-pre-line relative ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : message.type === 'simulation'
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                        : 'bg-muted'
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs font-medium">AI Assistant</span>
                      </div>
                    )}
                    {message.type === 'simulation' && (
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-600">Simulation Results</span>
                      </div>
                    )}
                    <p className="text-sm break-words">{message.content}</p>
                    
                    {/* Simulation Details */}
                    {message.simulation && (
                      <div className="mt-3 space-y-3 border-t pt-3">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="font-medium text-gray-600">Current</div>
                            <div>Yield: {message.simulation.before.yield}</div>
                            <div>Risk: {message.simulation.before.risk}</div>
                          </div>
                          <div>
                            <div className="font-medium text-green-600">Projected</div>
                            <div>Yield: {message.simulation.after.yield}</div>
                            <div>Risk: {message.simulation.after.risk}</div>
                          </div>
                        </div>
                        <div className="text-xs">
                          <div className="font-medium text-blue-600">Impact</div>
                          <div>{message.simulation.impact}</div>
                        </div>
                        <div className="text-xs">
                          <div className="font-medium text-purple-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Timeline
                          </div>
                          <div>{message.simulation.timeline}</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Copy button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyMessage(message.content)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {message.actions && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={action.variant || 'default'}
                          onClick={action.action}
                          className="text-xs"
                          disabled={isProcessing}
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
                <div className="bg-muted p-3 rounded-lg max-w-[85%]">
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
                ref={inputRef}
                placeholder="Ask for simulations, analysis, optimization..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isProcessing}
              />
              <Button 
                onClick={() => handleSendMessage()} 
                size="sm"
                disabled={isProcessing || !inputValue.trim()}
              >
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
