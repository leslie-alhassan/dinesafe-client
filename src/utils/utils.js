export const calculateRating = (currStatus, lastInspection) => {
  // lastInspection: [date: [inspections]]
  let rating = 5;

  // deduct rating based on current status
  if (currStatus.toLowerCase().includes('conditional')) {
    rating -= 1;
  } else if (currStatus.toLowerCase().includes('closed')) {
    rating -= 3;
  }

  if (lastInspection[0]) {
    // deduct ratings for each infraction on last inspection
    lastInspection.forEach((inspection) => {
      if (inspection.inspection_details || inspection['Infraction Details']) {
        rating -= 0.2;
      }
    });

    if (lastInspection[0].status.toLowerCase().includes('conditional')) {
      rating -= 0.5;
    } else if (lastInspection[0].status.toLowerCase().includes('closed')) {
      rating -= 1;
    }
  }
  return Math.round(rating * 100) / 100;
};
