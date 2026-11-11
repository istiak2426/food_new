import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle, Sparkles, AlertCircle, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { SeatingZone, OccasionType, TableBooking } from '../types/restaurant';
import { SEATING_ZONES, TIME_SLOTS, RESTAURANT_INFO } from '../data/restaurantData';

interface TableBookingSectionProps {
  onBookingConfirmed: (booking: TableBooking) => void;
  onViewBookings: () => void;
}

export const TableBookingSection: React.FC<TableBookingSectionProps> = ({
  onBookingConfirmed,
  onViewBookings,
}) => {
  // Today's date in YYYY-MM-DD
  const today = new Date();
  const formatDateStr = (date: Date) => date.toISOString().split('T')[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  const [selectedZone, setSelectedZone] = useState<SeatingZone>('jade_pavilion');
  const [selectedDate, setSelectedDate] = useState<string>(formatDateStr(today));
  const [selectedMealPeriod, setSelectedMealPeriod] = useState<'lunch' | 'dinner'>('dinner');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('07:30 PM');
  const [guestsCount, setGuestsCount] = useState<number>(4);
  const [occasion, setOccasion] = useState<OccasionType>('Family Gathering');
  const [guestName, setGuestName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const currentZoneData = SEATING_ZONES.find((z) => z.id === selectedZone)!;

  const handleSelectZone = (zoneId: SeatingZone) => {
    setSelectedZone(zoneId);
    const z = SEATING_ZONES.find((item) => item.id === zoneId)!;
    if (guestsCount < z.minGuests) {
      setGuestsCount(z.minGuests);
    } else if (guestsCount > z.maxGuests) {
      setGuestsCount(z.maxGuests);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!guestName.trim()) {
      setFormError('Please enter your full name for the reservation.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setFormError('Please provide a valid contact phone number.');
      return;
    }

    // Minimum guests check for VIP
    if (guestsCount < currentZoneData.minGuests) {
      setFormError(`${currentZoneData.name} requires at least ${currentZoneData.minGuests} guests.`);
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `CGD-B${randomSuffix}`;

    const newBooking: TableBooking = {
      id: `booking-${Date.now()}`,
      bookingCode,
      guestName: guestName.trim(),
      phone: phone.trim(),
      email: email.trim() || `${phone.replace(/\D/g, '')}@guest.chinagarden.bd`,
      guestsCount,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      seatingZone: selectedZone,
      occasion,
      specialRequests: specialRequests.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    onBookingConfirmed(newBooking);
    setConfirmedBooking(newBooking);
  };

  const handleNewBooking = () => {
    setConfirmedBooking(null);
    setGuestName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
    setGuestsCount(4);
  };

  return (
    <section id="booking-section" className="py-12 lg:py-16 bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Table & Banquet Reservations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Reserve Your Dining Sanctuary
          </h2>
          <p className="text-sm text-zinc-400">
            Secure your preferred table at China Garden Dhanmondi. No waiting in queue—your table will be freshly dressed and reserved upon arrival.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Success Card */
          <div className="max-w-2xl mx-auto bg-zinc-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Table Reservation Confirmed!
              </h3>
              <p className="text-sm text-zinc-300">
                We are delighted to welcome you to China Garden Dhaka.
              </p>
            </div>

            {/* Ticket Slip */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Reservation Reference
                  </div>
                  <div className="font-mono text-xl font-bold text-amber-400">
                    {confirmedBooking.bookingCode}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Status
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase">
                    Guaranteed Reserved
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-zinc-500 block">Primary Guest</span>
                  <span className="text-zinc-200 font-semibold">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Contact Phone</span>
                  <span className="text-zinc-200 font-mono">{confirmedBooking.phone}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Date & Time</span>
                  <span className="text-zinc-200 font-semibold">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Party Size</span>
                  <span className="text-zinc-200 font-semibold">
                    {confirmedBooking.guestsCount} Guests ({confirmedBooking.occasion})
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-zinc-500 block">Reserved Hall / Area</span>
                  <span className="text-amber-300 font-medium">
                    {SEATING_ZONES.find((z) => z.id === confirmedBooking.seatingZone)?.name}
                  </span>
                </div>
                {confirmedBooking.specialRequests && (
                  <div className="col-span-2">
                    <span className="text-zinc-500 block">Special Requests</span>
                    <span className="text-zinc-300 italic">"{confirmedBooking.specialRequests}"</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs text-zinc-400 flex items-center gap-2 bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Please arrive within 15 minutes of your reserved time slot. Need changes? Call our host desk directly at {RESTAURANT_INFO.phone}.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleNewBooking}
                className="w-full sm:w-1/2 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-lg text-xs transition-colors cursor-pointer text-center"
              >
                Book Another Table
              </button>
              <button
                onClick={onViewBookings}
                className="w-full sm:w-1/2 py-3 px-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-lg text-xs transition-colors cursor-pointer text-center shadow-sm"
              >
                View My Reservations
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Reservation Form */
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8"
          >
            {formError && (
              <div className="p-3.5 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Step 1: Seating Zone Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>1. Choose Seating Area</span>
                </label>
                <span className="text-xs text-zinc-500">
                  Selected: {currentZoneData.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEATING_ZONES.map((zone) => {
                  const isSelected = selectedZone === zone.id;
                  return (
                    <div
                      key={zone.id}
                      onClick={() => handleSelectZone(zone.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-500/10 text-white ring-1 ring-amber-400/40'
                          : 'border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-950'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-white">
                          {zone.name}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-zinc-400">
                          {zone.capacity}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                        {zone.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date & Meal Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-zinc-800/80">
              
              {/* Date selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                  2. Reservation Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDate(formatDateStr(today))}
                    className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedDate === formatDateStr(today)
                        ? 'border-amber-400 bg-amber-400 text-zinc-950 font-bold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(formatDateStr(tomorrow))}
                    className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedDate === formatDateStr(tomorrow)
                        ? 'border-amber-400 bg-amber-400 text-zinc-950 font-bold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    Tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDate(formatDateStr(dayAfter))}
                    className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                      selectedDate === formatDateStr(dayAfter)
                        ? 'border-amber-400 bg-amber-400 text-zinc-950 font-bold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    Day After
                  </button>
                </div>
                
                {/* Specific date input */}
                <input
                  type="date"
                  min={formatDateStr(today)}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Time slot period & chips */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                    3. Time Slot
                  </label>
                  <div className="flex items-center gap-1 p-0.5 bg-zinc-950 rounded-md border border-zinc-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedMealPeriod('lunch')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        selectedMealPeriod === 'lunch'
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'text-zinc-400'
                      }`}
                    >
                      Lunch
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMealPeriod('dinner')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        selectedMealPeriod === 'dinner'
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'text-zinc-400'
                      }`}
                    >
                      Dinner
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS[selectedMealPeriod].map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-mono tabular-nums rounded-lg border text-center transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400 text-zinc-950 font-bold'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Step 3: Guests Count & Occasion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-zinc-800/80">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                  4. Number of Guests
                </label>
                <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5">
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.max(currentZoneData.minGuests, guestsCount - 1))}
                    disabled={guestsCount <= currentZoneData.minGuests}
                    className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 rounded text-zinc-200 flex items-center justify-center font-bold text-base cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center font-mono tabular-nums text-lg font-bold text-white">
                    {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                  </div>
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.min(currentZoneData.maxGuests, guestsCount + 1))}
                    disabled={guestsCount >= currentZoneData.maxGuests}
                    className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 rounded text-zinc-200 flex items-center justify-center font-bold text-base cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <div className="text-[11px] text-zinc-500">
                  {currentZoneData.name} fits {currentZoneData.minGuests} to {currentZoneData.maxGuests} guests.
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="occasionSelect"
                  className="text-xs font-semibold uppercase tracking-wider text-amber-400 block"
                >
                  5. Dining Occasion
                </label>
                <select
                  id="occasionSelect"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value as OccasionType)}
                  className="w-full px-3.5 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Family Gathering">Family Gathering</option>
                  <option value="Birthday Party">Birthday Celebration</option>
                  <option value="Anniversary Dinner">Anniversary Dinner</option>
                  <option value="Business Dining">Corporate / Business Dining</option>
                  <option value="Casual Meal">Casual Lunch / Dinner</option>
                  <option value="Banquet Feast">Banquet Feast</option>
                </select>
              </div>

            </div>

            {/* Step 4: Contact Details */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                6. Guest Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guestName" className="block text-xs text-zinc-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    placeholder="e.g. Istiak Shanto"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label htmlFor="guestPhone" className="block text-xs text-zinc-400 mb-1">
                    Phone Number (Dhaka) *
                  </label>
                  <input
                    id="guestPhone"
                    type="tel"
                    required
                    placeholder="01711-xxxxxx or +880 1..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="specialRequests" className="block text-xs text-zinc-400 mb-1">
                  Special Arrangements / Dietary Requests
                </label>
                <input
                  id="specialRequests"
                  type="text"
                  placeholder="e.g. High chair for toddler, celebration flower table setup, window side preferred"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-zinc-950 font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4 text-zinc-950" />
                <span>Confirm Reservation at China Garden Dhaka</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
