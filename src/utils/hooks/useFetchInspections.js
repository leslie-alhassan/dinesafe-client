import axios from 'axios';
import inspectionData from '../../data/dinesafe.json';

const useFetchInspections = async (establishmentId, establishmentName) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/inspections/${establishmentId}`
    );

    if (data.length === 0) {
      const details = inspectionData.filter((establishment) => {
        return establishment['Establishment ID'] === establishmentId;
      });

      // populate database with inspection details
      details.forEach(async (insp) => {
        const inspectionDetails = {
          inspection_id: insp['Inspection ID'],
          establishment_id: insp['Establishment ID'],
          inspection_date: insp['Inspection Date'],
          status: insp['Establishment Status'],
          inspection_details: insp['Infraction Details'],
          severity: insp['Severity'],
          action: insp['Action'],
          outcome: insp['Outcome'],
          amount_fined: insp['Amount Fined'],
          establishment_type: insp['Establishment Type'],
        };

        try {
          await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/inspections/`,
            inspectionDetails
          );
        } catch (err) {
          console.error({
            message: `Unable to populate database with inspection details for ${establishmentName}`,
            error: err.message,
          });
        }
      });

      // group inspections by date
      const groupedInspections = {};
      details.reverse().forEach((inspection) => {
        if (!groupedInspections[inspection['Inspection Date']]) {
          groupedInspections[inspection['Inspection Date']] = [inspection];
        } else {
          groupedInspections[inspection['Inspection Date']].push(inspection);
        }
      });

      return groupedInspections;
    } else {
      // group inspections by date
      const groupedInspections = {};
      data.forEach((inspection) => {
        if (!groupedInspections[inspection.inspection_date]) {
          groupedInspections[inspection.inspection_date] = [inspection];
        } else {
          groupedInspections[inspection.inspection_date].push(inspection);
        }
      });

      return groupedInspections;
    }
  } catch (err) {
    console.error({
      message: 'Unable to fetch inspections',
      meta: `tried fetching: ${
        import.meta.env.VITE_SERVER_URL
      }/api/inspections/${establishmentId}`,
      error: err,
    });
  }
};

export default useFetchInspections;
