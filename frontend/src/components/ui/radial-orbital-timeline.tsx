"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";


interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [highlightedNodeId, setHighlightedNodeId] = useState<number | null>(null);

  // Mobile drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const lastHighlightedRef = useRef<number | null>(null);

  // Constants
  const TOP_POSITION_ANGLE = 270;
  const THRESHOLD = 5;
  const ROTATION_SPEED = 0.3;

  const handleContainerClick = () => {
    // Optional: Clear expansion on background click if desired
    // if (e.target === containerRef.current) setExpandedItems({});
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Rotation Logic
  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (!isPaused) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          // Anticlockwise: decrement angle
          let newAngle = prev - ROTATION_SPEED;
          if (newAngle < 0) newAngle += 360;
          return newAngle;
        });
      }, 20);
    }

    return () => clearInterval(rotationTimer);
  }, [isPaused]);

  // Top detection logic
  useEffect(() => {
    if (isPaused) return;

    const totalNodes = timelineData.length;

    // Check if any node is at the top
    for (let i = 0; i < totalNodes; i++) {
      const item = timelineData[i];
      // Calculate current angle of this node
      // Node base angle: (i / total) * 360
      // Current total angle: base + rotation
      const baseAngle = (i / totalNodes) * 360;
      const currentNodeAngle = (baseAngle + rotationAngle) % 360; // Normalize 0-360

      // Check distance to 270
      const diff = Math.abs(currentNodeAngle - TOP_POSITION_ANGLE);

      if (diff < THRESHOLD) {
        // Check if we just processed this node to avoid duplicate pauses
        if (lastHighlightedRef.current !== item.id) {
          // Pause!
          setIsPaused(true);
          setHighlightedNodeId(item.id);
          lastHighlightedRef.current = item.id;

          // Resume after 1.5s
          setTimeout(() => {
            setIsPaused(false);
          }, 500);
        }
        break; // Found one, no need to check others in this tick
      }
    }
  }, [rotationAngle, isPaused, timelineData]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200; // Fixed radius
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    // Z-index calculation for pseudo-3D
    const zIndex = Math.round(100 + 50 * Math.cos(radian)); // Closer items higher Z

    const opacity = 1;

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-white bg-emerald-600 border-emerald-400";
      case "in-progress": return "text-white bg-blue-600 border-blue-400";
      case "pending": return "text-white/70 bg-gray-800 border-gray-600";
      default: return "text-white bg-gray-800";
    }
  };

  const highlightedItem = timelineData.find(i => i.id === highlightedNodeId) || timelineData[0];

  return (
    <div
      className="w-full h-full flex flex-col md:flex-row bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Left Side Panel (Desktop) / Collapsible Drawer (Mobile) */}
      <div className={cn(
        "w-full md:w-1/3 p-6 z-20 flex flex-col justify-center transition-all duration-500",
        "fixed bottom-0 left-0 h-[40vh] md:h-full md:relative md:bg-transparent",
        "bg-black/80 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/10",
        !isDrawerOpen ? "translate-y-full md:translate-y-0" : "translate-y-0"
      )}>
        {/* Helper handle for mobile to toggle if needed, or we just keep it always visible on desktop */}
        <div className="md:hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 p-2 rounded-t-xl cursor-pointer border-t border-x border-white/10"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          {isDrawerOpen ? <ChevronDown size={20} className="text-white" /> : <ChevronUp size={20} className="text-white" />}
        </div>

        {highlightedItem && (
          <div className="space-y-6 animate-in slide-in-from-left-10 duration-500">
            <div className="space-y-2">
              <Badge variant="outline" className={cn("px-3 py-1 uppercase tracking-widest text-[10px]", getStatusStyles(highlightedItem.status))}>
                {highlightedItem.status}
              </Badge>
              <h2 className="text-4xl font-bold text-white leading-tight">{highlightedItem.title}</h2>
              <p className="text-white/50 font-mono text-sm">{highlightedItem.date}</p>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white text-lg">
                  <highlightedItem.icon size={20} className="text-[#FFD700]" />
                  Node Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 leading-relaxed text-sm">
                  {highlightedItem.content}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Energy Level</span>
                    <span>{highlightedItem.energy}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] transition-all duration-1000"
                      style={{ width: `${highlightedItem.energy}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Right Side - Orbital View */}
      <div className="relative flex-1 h-full flex items-center justify-center min-h-[500px]">
        <div className="absolute w-full h-full flex items-center justify-center" ref={orbitRef}>
          {/* Center decorative element */}
          <div className="absolute w-24 h-24 z-0 flex items-center justify-center">
            <img src={logo} alt="Center Logo" className="w-full h-full object-contain opacity-80" />
          </div>
          <div className="absolute w-96 h-96 rounded-full border-2 border-[#FFD700]/30 z-0"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-[#FFD700]/20 z-0 opacity-50"></div>

          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length);
            const isHighlighted = highlightedNodeId === item.id;
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute flex flex-col items-center justify-center cursor-pointer transition-all duration-500"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${isHighlighted ? 1.2 : 1})`,
                  zIndex: isExpanded ? 50 : (isHighlighted ? 40 : pos.zIndex),
                  opacity: 1
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Glow effect for highlighted */}
                {isHighlighted && <div className="absolute inset-0 bg-[#FFD700]/30 blur-xl rounded-full scale-150"></div>}

                <div className={cn(
                  "relative w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 bg-black/90 backdrop-blur-xl z-10",
                  isHighlighted ? "border-[#FFD700] text-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.5)]" : "border-white/10 text-white/50 hover:border-white/50 hover:text-white"
                )}>
                  <Icon size={20} className="relative z-10" />
                  {/* Energy Orbit Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 z-0" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" strokeWidth="3" stroke="#FFD700" strokeOpacity="0.3" />
                    <circle
                      cx="50" cy="50" r="48"
                      fill="none"
                      strokeWidth="3"
                      stroke="#FFD700"
                      strokeDasharray={`${item.energy * 3} 300`}
                      className="opacity-80"
                    />
                  </svg>
                </div>

                {/* Label (only if highlighted or hover) */}
                <div className={cn(
                  "absolute top-14 whitespace-nowrap text-xs font-bold tracking-wider transition-opacity duration-300 bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10 z-20",
                  isHighlighted ? "opacity-100 text-[#FFD700]" : "opacity-0 group-hover:opacity-100 text-white"
                )}>
                  {item.title}
                </div>

                {/* Expanded Card Popup */}
                {isExpanded && (
                  <Card className="absolute top-16 z-50 w-64 bg-black/90 border-white/20 text-left animate-in zoom-in-50 duration-200">
                    <CardHeader className="p-4 border-b border-white/10">
                      <CardTitle className="text-sm font-bold text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-xs text-white/70">
                      {item.content}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
