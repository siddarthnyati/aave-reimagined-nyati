
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface CreateContestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateContestModal = ({ open, onOpenChange }: CreateContestModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [prize, setPrize] = useState('');
  const [submissionEndDate, setSubmissionEndDate] = useState<Date>();
  const [votingEndDate, setVotingEndDate] = useState<Date>();
  const { toast } = useToast();

  const handleCreateContest = () => {
    if (!title || !description || !category || !prize) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Contest Created!",
      description: `"${title}" has been created successfully`,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setPrize('');
    setSubmissionEndDate(undefined);
    setVotingEndDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-background border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-outfit gradient-text">
            Create New Contest
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-space-grotesk">Contest Title *</Label>
            <Input
              id="title"
              placeholder="Enter contest title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-space-grotesk"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-space-grotesk">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your contest, rules, and what participants should submit..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="font-space-grotesk"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-space-grotesk">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="art">Art & Design</SelectItem>
                  <SelectItem value="memes">Memes</SelectItem>
                  <SelectItem value="ideas">Innovation Ideas</SelectItem>
                  <SelectItem value="predictions">Predictions</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prize" className="font-space-grotesk">Prize Pool (USDC) *</Label>
              <Input
                id="prize"
                placeholder="e.g., 1000"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                type="number"
                className="font-space-grotesk"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-space-grotesk">Submission Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {submissionEndDate ? format(submissionEndDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={submissionEndDate}
                    onSelect={setSubmissionEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="font-space-grotesk">Voting Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {votingEndDate ? format(votingEndDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={votingEndDate}
                    onSelect={setVotingEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-space-grotesk">Contest Banner (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground font-space-grotesk">
                Drag and drop an image, or click to browse
              </p>
              <Button variant="outline" className="mt-2" size="sm">
                Choose File
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 btn-primary"
              onClick={handleCreateContest}
            >
              Create Contest
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContestModal;
