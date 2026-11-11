import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, ChefHat, Bike, Flame, Package, Phone, MapPin } from 'lucide-react';
import { Order, OrderStatus } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderTrackerModalProps {
  order: Order | null;
  onClose: () => void;
}

const STAGES: {
  status: OrderStatus;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    status: 'received',
    label: 'Order Confirmed',
    description: 'Ticket received by kitchen manager',
    icon: CheckCircle2,
  },
  {
    status: 'preparing',
    label: 'Prep & Marination',
    description: 'Fresh ingredients gathered & prepped',
    icon: ChefHat,
  },
  {
    status: 'wok_sizzling',
    label: 'Live Wok Sizzling',
    description: 'Master chef tossing woks over 400°C burners',
    icon: Flame,
  },
  {
    status: 'out_for_delivery',
    label: 'Out for Delivery',
    description: 'Packed hot in insulated box and rider dispatched',
    icon: Bike,
  },
  {
    status: 'delivered',
    label: 'Arrived / Delivered',
    description: 'Ready to enjoy at your Dhaka home',
    icon: Package,
  },
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  // Simulate progress step over time
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(5);

  useEffect(() => {
    // Automatically progress status simulation
    const timer1 = setTimeout(() => setCurrentStatus('preparing'), 3000);
    const timer2 = setTimeout(() => setCurrentStatus('wok_sizzling'), 8000);
    const timer3 = setTimeout(() => setCurrentStatus('out_for_delivery'), 16000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const getStageIndex = (status: OrderStatus) => {
    const map: Record<OrderStatus, number> = {
      received: 0,
      preparing: 1,
      wok_sizzling: 2,
      out_for_delivery: 3,
      delivered: 4,
    };
    return map[status] ?? 0;
  };

  const currentStageIndex = getStageIndex(currentStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
              Live Order Tracker
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-amber-400">
                {order.orderCode}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-zinc-400 capitalize">
                {order.deliveryType} Order
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Close tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Status Banner */}
          <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-amber-400 font-semibold tracking-wide uppercase">
                Estimated Timing
              </span>
              <div className="text-lg font-bold text-white font-mono tabular-nums">
                ~{order.estimatedDeliveryMinutes} Minutes Delivery
              </div>
              <p className="text-xs text-zinc-400">
                Freshly cooked to order at China Garden Dhanmondi.
              </p>
            </div>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hotline</span>
            </a>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Kitchen & Delivery Progress
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-800">
              {STAGES.map((stg, idx) => {
                const isComplete = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const IconComponent = stg.icon;

                return (
                  <div key={stg.status} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                        isComplete
                          ? 'bg-amber-400 border-amber-400 text-zinc-950'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            isCurrent
                              ? 'text-amber-400'
                              : isComplete
                              ? 'text-white'
                              : 'text-zinc-500'
                          }`}
                        >
                          {stg.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-medium text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400">
                        {stg.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Destination */}
          <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{order.deliveryType === 'delivery' ? 'Delivery Destination' : 'Pickup Location'}</span>
            </div>
            <p className="text-sm font-medium text-white">
              {order.customerName} · {order.phone}
            </p>
            <p className="text-xs text-zinc-300">
              {order.deliveryAddress}
            </p>
          </div>

          {/* Ordered Dishes Summary */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Ordered Items ({order.items.length})
            </h4>

            <div className="divide-y divide-zinc-800/80">
              {order.items.map((it) => (
                <div key={it.cartItemId} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">
                      {it.quantity}x {it.name}
                    </span>
                    <span className="text-zinc-500 ml-2">
                      ({it.portion.label} · {it.spiceLevel})
                    </span>
                  </div>
                  <span className="font-mono tabular-nums text-zinc-300">
                    {RESTAURANT_INFO.currency}{it.price * it.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-between text-sm font-bold text-white">
              <span>Total Amount ({order.paymentMethod.replace(/_/g, ' ')})</span>
              <span className="font-mono tabular-nums text-amber-400">
                {RESTAURANT_INFO.currency}{order.total}
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
