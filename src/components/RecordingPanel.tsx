
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Trash2, Share2, DownloadCloud, Clock, Music, Settings, Volume2, Check } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const RecordingPanel = () => {
  const [selectedRecording, setSelectedRecording] = useState<number | null>(null);
  const [recordingSettings, setRecordingSettings] = useState({
    format: "mp3",
    quality: "320",
    normalizeAudio: true,
    autoLevels: true
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // In a real app, this would be fetched from a database or storage
  const recordings = [
    { id: 1, title: 'Summer House Mix 2023', date: '2023-06-15', duration: '01:23:45', size: '127.4 MB' },
    { id: 2, title: 'Deep House Session #4', date: '2023-05-22', duration: '00:45:12', size: '54.8 MB' },
    { id: 3, title: 'EDM Club Mix', date: '2023-05-10', duration: '01:12:30', size: '86.3 MB' },
    { id: 4, title: 'Chill Lofi Beats', date: '2023-04-28', duration: '00:32:15', size: '38.9 MB' },
    { id: 5, title: 'Techno Underground', date: '2023-04-15', duration: '01:45:20', size: '126.7 MB' },
  ];

  const handleExport = (id: number, format = recordingSettings.format, quality = recordingSettings.quality) => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Find the recording
    const recording = recordings.find(rec => rec.id === id);
    
    // Simulate export process with progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          
          // Create a fake download URL (in a real app, this would be a Blob URL)
          setDownloadUrl(`#download-${recording?.title}-${format}-${quality}`);
          
          toast({
            title: "Export Complete",
            description: `Your mix "${recording?.title}" has been exported as a crystal-clear ${format.toUpperCase()} file at ${quality}kbps.`,
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const handlePlayRecording = (id: number) => {
    setSelectedRecording(selectedRecording === id ? null : id);
    
    toast({
      title: "Playback Started",
      description: `Now playing "${recordings.find(r => r.id === id)?.title}"`,
    });
  };
  
  const handleDeleteRecording = (id: number) => {
    // In a real app, this would delete from a database/storage
    toast({
      title: "Recording Deleted",
      description: `"${recordings.find(r => r.id === id)?.title}" has been removed from your library.`,
      variant: "destructive",
    });
  };

  const handleDownload = (recordingId: number) => {
    // In a real app, this would trigger a file download
    const recording = recordings.find(r => r.id === recordingId);
    
    toast({
      title: "Download Started",
      description: `Downloading "${recording?.title}" as ${recordingSettings.format.toUpperCase()} (${recordingSettings.quality}kbps).`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `"${recording?.title}" has been saved to your device.`,
      });
    }, 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="font-semibold">Your Recorded Mixes</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Recording Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crystal Clear Recording Options</DialogTitle>
              <DialogDescription>
                Configure your recording settings for the highest quality mixes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="format">Format</Label>
                <RadioGroup 
                  id="format" 
                  defaultValue={recordingSettings.format}
                  onValueChange={(value) => setRecordingSettings({...recordingSettings, format: value})}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mp3" id="mp3" />
                    <Label htmlFor="mp3">MP3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wav" id="wav" />
                    <Label htmlFor="wav">WAV</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flac" id="flac" />
                    <Label htmlFor="flac">FLAC</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="quality">Quality (kbps)</Label>
                <RadioGroup 
                  id="quality" 
                  defaultValue={recordingSettings.quality}
                  onValueChange={(value) => setRecordingSettings({...recordingSettings, quality: value})}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="192" id="192" />
                    <Label htmlFor="192">192</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="256" id="256" />
                    <Label htmlFor="256">256</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="320" id="320" />
                    <Label htmlFor="320">320</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid gap-2">
                <Label>Audio Enhancement</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="checkbox" 
                    className="h-4 w-4" 
                    checked={recordingSettings.normalizeAudio}
                    onChange={() => setRecordingSettings({...recordingSettings, normalizeAudio: !recordingSettings.normalizeAudio})}
                  />
                  <Label>Normalize Audio Levels</Label>
                </div>
                <div className="flex items-center gap-4">
                  <Input 
                    type="checkbox" 
                    className="h-4 w-4" 
                    checked={recordingSettings.autoLevels}
                    onChange={() => setRecordingSettings({...recordingSettings, autoLevels: !recordingSettings.autoLevels})}
                  />
                  <Label>Auto-adjust Levels</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="divide-y divide-gray-800">
        {recordings.map(recording => (
          <div key={recording.id} className="p-4 hover:bg-gray-800/50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-grow">
              <h4 className="font-medium">{recording.title}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{recording.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Music className="h-3.5 w-3.5" />
                  <span>{recording.size}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="default" 
                className={selectedRecording === recording.id ? "bg-green-600 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-600"}
                onClick={() => handlePlayRecording(recording.id)}
              >
                <Play className="h-4 w-4 mr-1" />
                {selectedRecording === recording.id ? "Playing" : "Play"}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="outline">
                    <DownloadCloud className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Export Mix</DialogTitle>
                    <DialogDescription>
                      Export "{recording.title}" with your preferred settings
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Output Format</Label>
                      <RadioGroup defaultValue={recordingSettings.format} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mp3" id={`export-mp3-${recording.id}`} />
                          <Label htmlFor={`export-mp3-${recording.id}`}>MP3</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="wav" id={`export-wav-${recording.id}`} />
                          <Label htmlFor={`export-wav-${recording.id}`}>WAV</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="flac" id={`export-flac-${recording.id}`} />
                          <Label htmlFor={`export-flac-${recording.id}`}>FLAC</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Volume Normalization</Label>
                        <span className="text-sm text-gray-400">-3dB</span>
                      </div>
                      <Slider defaultValue={[70]} max={100} step={1} />
                    </div>
                    
                    {isExporting && (
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between">
                          <Label>Export Progress</Label>
                          <span className="text-sm text-gray-400">{exportProgress}%</span>
                        </div>
                        <Progress value={exportProgress} className="h-2" />
                      </div>
                    )}
                    
                    {downloadUrl && !isExporting && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-3 flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-400">Export complete! Ready to download.</span>
                      </div>
                    )}
                  </div>
                  <DialogFooter className="flex gap-2">
                    {downloadUrl && !isExporting ? (
                      <Button 
                        onClick={() => handleDownload(recording.id)} 
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <DownloadCloud className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleExport(recording.id)} 
                        disabled={isExporting}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        {isExporting ? 'Processing...' : 'Export Mix'}
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="icon" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                onClick={() => handleDeleteRecording(recording.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {recordings.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-400">No recordings yet. Start mixing and hit record!</p>
        </div>
      )}
    </div>
  );
};

export default RecordingPanel;
