import React from 'react';
import { X, Wrench, Calendar, Package, Printer } from 'lucide-react';
import { Booking } from '../types';

interface MyRepairsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string } | null;
  bookings: Booking[];
  orders: any[];
}

export const MyRepairsModal: React.FC<MyRepairsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  bookings,
  orders
}) => {
  if (!isOpen) return null;

  const userBookings = bookings.filter(b => !currentUser || b.email.toLowerCase() === currentUser.email.toLowerCase() || currentUser.email.includes('admin'));
  const userOrders = orders.filter(o => !currentUser || o.email?.toLowerCase() === currentUser.email.toLowerCase() || currentUser.email.includes('admin'));

  const handlePrintReceipt = (booking: Booking) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Repair Receipt - ${booking.trackingCode}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; padding: 40px; max-width: 700px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: 900; color: #0f172a; }
            .logo span { color: #0284c7; }
            .sub { font-size: 11px; font-weight: bold; color: #0284c7; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
            .receipt-title { font-size: 20px; font-weight: 800; margin: 20px 0 10px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
            .field-label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; }
            .field-value { font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 2px; }
            .badge { display: inline-block; background: #e0f2fe; color: #0369a1; font-weight: 800; padding: 4px 12px; border-radius: 6px; font-size: 14px; }
            .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Techy <span>Longview</span></div>
            <div class="sub">Computers • Tablets • Phones Repair Receipt</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
              <div class="receipt-title">Repair Booking Receipt</div>
              <div style="font-size: 13px; color: #64748b;">Issued on ${new Date().toLocaleDateString()}</div>
            </div>
            <div>
              <span class="badge">Code: ${booking.trackingCode}</span>
            </div>
          </div>

          <div class="grid">
            <div>
              <div class="field-label">Customer Name</div>
              <div class="field-value">${booking.customerName}</div>
            </div>
            <div>
              <div class="field-label">Phone Number</div>
              <div class="field-value">${booking.phone}</div>
            </div>
            <div>
              <div class="field-label">Device</div>
              <div class="field-value">${booking.brand} ${booking.model} (${booking.deviceType})</div>
            </div>
            <div>
              <div class="field-label">Issue Reported</div>
              <div class="field-value">${booking.issue}</div>
            </div>
            <div>
              <div class="field-label">Scheduled Date & Time</div>
              <div class="field-value">${booking.date} (${booking.timeSlot})</div>
            </div>
            <div>
              <div class="field-label">Current Status</div>
              <div class="field-value" style="color: #0284c7; font-weight: 800;">${booking.status || 'Received'}</div>
            </div>
          </div>

          <div style="background: #fdf2f8; border: 1px solid #fbcfe8; padding: 15px; border-radius: 8px; font-size: 13px; color: #be185d; margin-bottom: 30px;">
            <strong>Important Note:</strong> Please bring this receipt or your tracking code <strong>${booking.trackingCode}</strong> when dropping off or picking up your device at our Longview location.
          </div>

          <div class="footer">
            Techy Longview • 1003 Ocean Beach Hwy, Longview, WA 98632 • Tel: 360-270-8896
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-inner">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">My Repairs & Orders</h2>
            <p className="text-xs text-slate-500">
              Logged in as <span className="font-bold text-slate-800">{currentUser?.name || 'Customer'}</span> ({currentUser?.email})
            </p>
          </div>
        </div>

        {/* Repair Bookings Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600" /> Repair History & Active Bookings ({userBookings.length})
            </h3>
          </div>

          {userBookings.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-2xl text-center text-slate-500 text-xs">
              No repair history or active bookings found for this account. Book a repair anytime!
            </div>
          ) : (
            <div className="space-y-3">
              {userBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-lg">
                      Tracking Code: {booking.trackingCode}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800">
                        {booking.status || 'Received'}
                      </span>
                      <button
                        onClick={() => handlePrintReceipt(booking)}
                        className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                        title="Print PDF Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" /> Print Receipt
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {booking.brand} {booking.model} — <span className="text-sky-600">{booking.issue}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-4">
                    <span>📅 Scheduled: {booking.date} ({booking.timeSlot})</span>
                    <span>📞 {booking.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accessory Orders Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-sky-600" /> Accessory Order History ({userOrders.length})
          </h3>

          {userOrders.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-2xl text-center text-slate-500 text-xs">
              No online accessory orders placed yet.
            </div>
          ) : (
            <div className="space-y-3">
              {userOrders.map((order, idx) => (
                <div key={order.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-sky-700">Order #{order.id}</span>
                    <span className="text-sm font-black text-slate-900">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Items: {order.items.map((i: any) => `${i.name} (x${i.quantity})`).join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
