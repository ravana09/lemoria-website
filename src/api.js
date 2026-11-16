// Sends a form to the server, which emails Lemoria and sends the visitor a confirmation (see server/api.js).
// Resolves with the server's reply on success, throws an Error with a visitor-friendly message on failure.
async function post(payload) {
  let res;
  try {
    res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, page: window.location.pathname }),
    });
  } catch {
    throw new Error('We could not reach the server. Please check your connection or call us.');
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.ok) throw new Error(body.error || 'Something went wrong. Please call us instead.');
  return body;
}

// Contact form: name, email, phone, type, message.
export const submitEnquiry = (data) => post({ kind: 'enquiry', ...data });

// Booking page: kind is 'seats' or 'conference'.
export const submitBooking = (data) => post(data);
