import React, { useState, useRef } from 'react'
import { Download, Share2, Palette, Type, Image as ImageIcon, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Slider } from './ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import toast from 'react-hot-toast'

// Import meme template
import memeTemplate from '../assets/meme_template.png'
import mascotHazCat from '../assets/mascot_haz_cat.png'

export const MemeGenerator = () => {
  const canvasRef = useRef(null)
  const [topText, setTopText] = useState('CAN I HAZ')
  const [bottomText, setBottomText] = useState('FINANCIAL FREEDOM?')
  const [fontSize, setFontSize] = useState(40)
  const [fontColor, setFontColor] = useState('#FFFFFF')
  const [strokeColor, setStrokeColor] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState(3)
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [isGenerating, setIsGenerating] = useState(false)

  const memeTemplates = [
    {
      id: 'classic',
      name: 'Classic Cheezburger',
      image: memeTemplate,
      description: 'The original I Can Has Cheezburger meme'
    },
    {
      id: 'mascot',
      name: 'Haz Cat Mascot',
      image: mascotHazCat,
      description: 'Our crypto-ready mascot'
    }
  ]

  const presetTexts = [
    { top: 'CAN I HAZ', bottom: 'FINANCIAL FREEDOM?' },
    { top: 'HODLING ICHZ', bottom: 'LIKE A BOSS' },
    { top: 'WEN MOON?', bottom: 'NOW MOON!' },
    { top: 'DIAMOND PAWS', bottom: 'NEVER SELLING' },
    { top: 'TO THE MOON', bottom: 'AND BEYOND!' },
    { top: 'ICHZ ARMY', bottom: 'ASSEMBLE!' }
  ]

  const colorPresets = [
    { name: 'Classic White', color: '#FFFFFF', stroke: '#000000' },
    { name: 'ICHZ Blue', color: '#4A90E2', stroke: '#FFFFFF' },
    { name: 'Gold Rush', color: '#FFD700', stroke: '#000000' },
    { name: 'Meme Purple', color: '#9B59B6', stroke: '#FFFFFF' },
    { name: 'Community Green', color: '#27AE60', stroke: '#000000' }
  ]

  const generateMeme = async () => {
    setIsGenerating(true)
    
    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      // Set canvas size
      canvas.width = 500
      canvas.height = 500
      
      // Load and draw the selected template
      const template = memeTemplates.find(t => t.id === selectedTemplate)
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw background image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        // Set text properties
        ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`
        ctx.fillStyle = fontColor
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = strokeWidth
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Add text shadow for better readability
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        
        // Draw top text
        if (topText) {
          const topY = fontSize + 20
          ctx.strokeText(topText.toUpperCase(), canvas.width / 2, topY)
          ctx.fillText(topText.toUpperCase(), canvas.width / 2, topY)
        }
        
        // Draw bottom text
        if (bottomText) {
          const bottomY = canvas.height - fontSize - 20
          ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, bottomY)
          ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, bottomY)
        }
        
        setIsGenerating(false)
        toast.success('Meme generated successfully!')
      }
      
      img.onerror = () => {
        setIsGenerating(false)
        toast.error('Failed to load meme template')
      }
      
      img.src = template.image
      
    } catch (error) {
      setIsGenerating(false)
      toast.error('Failed to generate meme')
      console.error('Meme generation error:', error)
    }
  }

  const downloadMeme = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = `ichz-meme-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
    toast.success('Meme downloaded!')
  }

  const shareMeme = async () => {
    const canvas = canvasRef.current
    
    if (navigator.share) {
      try {
        canvas.toBlob(async (blob) => {
          const file = new File([blob], 'ichz-meme.png', { type: 'image/png' })
          await navigator.share({
            title: 'IcanHaz Coin Meme',
            text: 'Check out this ICHZ meme I created!',
            files: [file]
          })
        })
      } catch (error) {
        toast.error('Sharing failed')
      }
    } else {
      // Fallback: copy to clipboard
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
          toast.success('Meme copied to clipboard!')
        } catch (error) {
          toast.error('Copy to clipboard failed')
        }
      })
    }
  }

  const applyPreset = (preset) => {
    setTopText(preset.top)
    setBottomText(preset.bottom)
  }

  const applyColorPreset = (preset) => {
    setFontColor(preset.color)
    setStrokeColor(preset.stroke)
  }

  // Generate meme when component mounts or settings change
  React.useEffect(() => {
    const timer = setTimeout(() => {
      generateMeme()
    }, 300)
    
    return () => clearTimeout(timer)
  }, [topText, bottomText, fontSize, fontColor, strokeColor, strokeWidth, selectedTemplate])

  return (
    <Card className="card-glow max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" size={20} />
          ICHZ Meme Generator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Create your own IcanHaz Coin memes and share them with the community!
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-6">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text">
                  <Type size={16} className="mr-2" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="style">
                  <Palette size={16} className="mr-2" />
                  Style
                </TabsTrigger>
                <TabsTrigger value="template">
                  <ImageIcon size={16} className="mr-2" />
                  Template
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="top-text">Top Text</Label>
                  <Input
                    id="top-text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Enter top text..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bottom-text">Bottom Text</Label>
                  <Input
                    id="bottom-text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Enter bottom text..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Quick Presets</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {presetTexts.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => applyPreset(preset)}
                        className="text-xs h-auto py-2 px-3"
                      >
                        <div className="text-center">
                          <div>{preset.top}</div>
                          <div className="text-muted-foreground">{preset.bottom}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                <div className="space-y-2">
                  <Label>Font Size: {fontSize}px</Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    max={80}
                    min={20}
                    step={2}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stroke Width: {strokeWidth}px</Label>
                  <Slider
                    value={[strokeWidth]}
                    onValueChange={(value) => setStrokeWidth(value[0])}
                    max={8}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-color">Font Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="font-color"
                        type="color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stroke-color">Stroke Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="stroke-color"
                        type="color"
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Color Presets</Label>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => applyColorPreset(preset)}
                        className="text-xs"
                      >
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: preset.color }}
                        />
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="template" className="space-y-4">
                <div className="space-y-2">
                  <Label>Choose Template</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {memeTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTemplate === template.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={template.image} 
                            alt={template.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <div className="font-semibold">{template.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {template.description}
                            </div>
                          </div>
                          {selectedTemplate === template.id && (
                            <Badge className="ml-auto">Selected</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={downloadMeme}
                className="flex-1 flex items-center gap-2"
                disabled={isGenerating}
              >
                <Download size={16} />
                Download
              </Button>
              <Button
                onClick={shareMeme}
                variant="outline"
                className="flex-1 flex items-center gap-2"
                disabled={isGenerating}
              >
                <Share2 size={16} />
                Share
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="text-center">
              <Label className="text-lg font-semibold">Preview</Label>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto border border-border rounded-lg shadow-lg"
                  style={{ maxHeight: '500px' }}
                />
                {isGenerating && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                      <div className="text-sm text-muted-foreground">Generating...</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Share your memes with #IcanHazCoin on social media!</p>
              <p className="mt-1">Help spread the word about ICHZ! 🐱💰</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MemeGenerator

