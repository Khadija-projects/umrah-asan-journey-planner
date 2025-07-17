import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AvailabilityCalendarProps {
  hotelId: string;
  hotelName: string;
}

interface DateStatus {
  date: string;
  available: boolean;
  booked: boolean;
}

const AvailabilityCalendar = ({ hotelId, hotelName }: AvailabilityCalendarProps) => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateStatuses, setDateStatuses] = useState<Map<string, DateStatus>>(new Map());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  // Generate calendar dates for current month
  const generateCalendarDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const dates = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }
    
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.includes(formatDate(date));
  };

  const getDateStatus = (date: Date) => {
    const dateStr = formatDate(date);
    return dateStatuses.get(dateStr);
  };

  const toggleDateSelection = (date: Date) => {
    const dateStr = formatDate(date);
    setSelectedDates(prev => {
      if (prev.includes(dateStr)) {
        return prev.filter(d => d !== dateStr);
      } else {
        return [...prev, dateStr];
      }
    });
  };

  const markAsUnavailable = () => {
    if (selectedDates.length === 0) {
      toast({
        title: "No dates selected",
        description: "Please select dates to mark as unavailable",
        variant: "destructive",
      });
      return;
    }

    const newStatuses = new Map(dateStatuses);
    selectedDates.forEach(dateStr => {
      newStatuses.set(dateStr, {
        date: dateStr,
        available: false,
        booked: false,
      });
    });

    setDateStatuses(newStatuses);
    setSelectedDates([]);

    toast({
      title: "Success",
      description: `${selectedDates.length} dates marked as unavailable`,
    });
  };

  const markAsAvailable = () => {
    if (selectedDates.length === 0) {
      toast({
        title: "No dates selected",
        description: "Please select dates to mark as available",
        variant: "destructive",
      });
      return;
    }

    const newStatuses = new Map(dateStatuses);
    selectedDates.forEach(dateStr => {
      newStatuses.set(dateStr, {
        date: dateStr,
        available: true,
        booked: false,
      });
    });

    setDateStatuses(newStatuses);
    setSelectedDates([]);

    toast({
      title: "Success",
      description: `${selectedDates.length} dates marked as available`,
    });
  };

  const clearSelection = () => {
    setSelectedDates([]);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDates([]);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDates([]);
  };

  const calendarDates = generateCalendarDates();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Availability Calendar - {hotelName}
          </CardTitle>
          {selectedDates.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {selectedDates.length} selected
              </Badge>
              <Button size="sm" variant="outline" onClick={clearSelection}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={previousMonth}>
            ←
          </Button>
          <h3 className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <Button variant="outline" onClick={nextMonth}>
            →
          </Button>
        </div>

        {/* Action Buttons */}
        {selectedDates.length > 0 && (
          <div className="flex gap-2 mb-4">
            <Button size="sm" variant="outline" onClick={markAsAvailable}>
              Mark Available
            </Button>
            <Button size="sm" variant="outline" onClick={markAsUnavailable}>
              Mark Unavailable
            </Button>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span>Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary border border-primary rounded"></div>
            <span>Selected</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar dates */}
          {calendarDates.map((date, index) => {
            if (!date) {
              return <div key={index} className="p-2"></div>;
            }

            const isPast = date < today;
            const isSelected = isDateSelected(date);
            const status = getDateStatus(date);

            let className = "p-2 h-10 text-center border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors";
            
            if (isPast) {
              className += " text-gray-400 cursor-not-allowed";
            } else if (isSelected) {
              className += " bg-primary text-white";
            } else if (status?.booked) {
              className += " bg-blue-100 text-blue-800";
            } else if (status?.available === false) {
              className += " bg-red-100 text-red-800";
            } else if (status?.available === true) {
              className += " bg-green-100 text-green-800";
            }

            return (
              <div
                key={index}
                className={className}
                onClick={() => !isPast && toggleDateSelection(date)}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Instructions:</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Click on dates to select them</li>
            <li>• Use "Mark Available" to open dates for booking</li>
            <li>• Use "Mark Unavailable" to block dates</li>
            <li>• Blue dates are already booked by guests</li>
            <li>• Changes update your hotel listing automatically</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;