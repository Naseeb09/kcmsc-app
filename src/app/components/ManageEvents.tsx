import {
  ChevronLeft,
  Calendar,
  Edit,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { useAppContext } from "@/context/AppContext";

interface ManageEventsProps {
  onNavigate: (view: string) => void;
}

export function ManageEvents({
  onNavigate,
}: ManageEventsProps) {
  const { events, deleteEvent } = useAppContext();

  const handleDelete = (id: string, title: string) => {
    if (
      confirm(`Are you sure you want to delete "${title}"?`)
    ) {
      deleteEvent(id);
    }
  };

  return (
    <div className="pb-20 bg-[#0d1f0f] min-h-screen">
      {/* Header */}
      <div className="bg-[#1a2e1c] px-6 py-4 border-b border-[#059669]/20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("profile")}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a3a1d] text-[#059669]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium text-[#e8f5e9]">
                Manage Events
              </h1>
              <p className="text-[10px] text-[#a0b5a3] uppercase tracking-wide">
                EDIT OR DELETE EVENTS
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#059669]/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#fbbf24]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-[#a0b5a3] mx-auto mb-3" />
            <p className="text-sm text-[#a0b5a3]">
              No events created yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <Card
                key={event.id}
                className="bg-[#1a3a1d] border border-[#059669]/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#e8f5e9] mb-1">
                        {event.title}
                      </h3>
                      {event.date && (
                        <p className="text-xs text-[#a0b5a3] mb-2">
                          {event.date}
                        </p>
                      )}
                      <p className="text-xs text-[#a0b5a3] line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-[#059669]/20">
                    <button
                      onClick={() =>
                        handleDelete(event.id, event.title)
                      }
                      className="flex-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg py-2 px-4 text-xs font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}