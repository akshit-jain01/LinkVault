function calculateExpiry(expiresIn) {
  const DEFAULT_MINUTES = 10;
  const MAX_MINUTES = 24 * 60; // 1 day

  let minutes = Number(expiresIn);

  if (!minutes || isNaN(minutes)) {
    minutes = DEFAULT_MINUTES;
  }

  if (minutes < 1) {
    minutes = 1;
  }

  if (minutes > MAX_MINUTES) {
    minutes = MAX_MINUTES;
  }

  return new Date(Date.now() + minutes * 60 * 1000);
}

module.exports = calculateExpiry;
