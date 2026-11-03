/* js/data/chambers.js · Owner Part 4 · Chamber DETAIL records (extra fields only, keyed by id/slug) · Depends on: none (merged at runtime with SITE.chambersIndex) */
window.CHAMBERS = [
  { id: 'ch-001', slug: 'gec-circle',
    about: [
      'The GEC Circle chamber is Dr. Nabila Rahman’s main evening clinic in Chattogram, set inside Port City Specialized Hospital. It is the place for first consultations, ACL and shoulder assessments, joint replacement planning and post-operative reviews, with imaging and physiotherapy a short walk away.',
      'Because most surgeries are performed at the same hospital, patients are examined, counselled and admitted under one roof. Your reports, scans and surgical plan stay together, so follow-up visits are quicker and nothing has to be repeated.'],
    landmark: 'Five minutes’ walk from the GEC Circle roundabout, on O.R. Nizam Road',
    facilities: [
      { icon: 'car', title: 'Basement & street parking', description: 'Covered parking for cars and motorbikes, with an attendant during chamber hours.' },
      { icon: 'wheelchair', title: 'Wheelchair access', description: 'Step-free entrance, lifts to every floor and wheelchairs at the front desk.' },
      { icon: 'activity', title: 'X-ray & MRI referral', description: 'In-house digital X-ray; MRI and CT arranged on the same day where possible.' },
      { icon: 'heart', title: 'Physiotherapy unit', description: 'Rehabilitation gym with therapists who follow Dr. Nabila’s protocols.' },
      { icon: 'shield', title: '24/7 emergency', description: 'Round-the-clock emergency and trauma cover for fractures and accidents.' },
      { icon: 'credit-card', title: 'Cashless & corporate desk', description: 'Insurance and corporate panel support, plus bKash, Nagad and card payment at the counter.' }],
    howToReach: {
      byRoad: 'From Agrabad or CDA Avenue, follow the road to GEC Circle and turn into O.R. Nizam Road. The hospital is on your left, about 300 metres from the roundabout.',
      byRideshare: 'Ride-hailing apps such as Pathao and Uber work well. Set the pin to Port City Specialized Hospital and ask the driver to stop at the main porch.',
      byBus: 'City service buses and CNG auto-rickshaws stop at GEC Circle. Get down at the roundabout and walk along O.R. Nizam Road for about five minutes.',
      parking: 'Basement parking is free for patients on the day of the visit. Street parking fills up after 6:00 PM, so please arrive early on Saturdays.' },
    surgeryDays: 'Surgical lists run on Saturday to Wednesday mornings at Port City Specialized Hospital.',
    patientTips: ['Arrive 15 minutes before your slot to complete registration.', 'Bring every previous X-ray, MRI and report, including the written findings.', 'Wear loose clothing so the knee, hip or shoulder can be examined comfortably.', 'Evening clinics are busiest on Saturdays; booking ahead keeps your wait short.'],
    mapQuery: 'Port City Specialized Hospital, Plot 9, O.R. Nizam Road, GEC Circle, Chattogram 4202' },
  { id: 'ch-002', slug: 'khulshi',
    about: [
      'The Khulshi chamber is a calm morning clinic for patients in the northern and western parts of Chattogram. It suits follow-up visits, second opinions on scans, sports-injury reviews and children’s orthopaedic checks, in an unhurried setting with a diagnostic centre on site.',
      'Appointments here are held on Tuesday and Wednesday mornings, so families can combine the visit with school drop-offs and office hours. Cases that need surgery are planned here and operated at Port City Specialized Hospital.'],
    landmark: 'Near the junction of Zakir Hossain Road and Khulshi Road, opposite the residential blocks',
    facilities: [
      { icon: 'car', title: 'Visitor parking', description: 'Dedicated parking in front of the centre for cars and motorbikes.' },
      { icon: 'wheelchair', title: 'Ground-floor consulting room', description: 'The chamber is on the ground floor with a ramp and wide doorways.' },
      { icon: 'activity', title: 'Diagnostic centre', description: 'X-ray, ultrasound and blood tests in the same building, with reports the same day.' },
      { icon: 'stethoscope', title: 'Child-friendly room', description: 'A quiet play corner so children are relaxed before the examination.' },
      { icon: 'heart', title: 'Pharmacy', description: 'Prescribed medicines, braces and supports available at the ground-floor pharmacy.' },
      { icon: 'credit-card', title: 'Mobile & card payment', description: 'Pay by bKash, Nagad, card or cash at the front desk.' }],
    howToReach: {
      byRoad: 'From GEC Circle, take the road towards Khulshi and turn into Zakir Hossain Road. The centre is on House 7, a short drive from the Khulshi Road junction.',
      byRideshare: 'Pathao and Uber drivers know the Khulshi Medical & Diagnostic Centre; share your live location if the lane is unfamiliar.',
      byBus: 'Local buses and CNG auto-rickshaws run along Khulshi Road. Get down at the Zakir Hossain Road junction and walk about three minutes.',
      parking: 'Free visitor parking is available in front of the centre during chamber hours; motorbikes have a separate bay.' },
    surgeryDays: 'Surgeries are planned here and performed on Saturday to Wednesday mornings at Port City Specialized Hospital.',
    patientTips: ['Morning slots are quieter; book early in the week for the earliest times.', 'For children, bring the vaccination card and any growth records.', 'Have blood tests or X-rays done at the centre before you see the doctor if requested.', 'Bring your current medicines so they can be reviewed together.'],
    mapQuery: 'Khulshi Medical & Diagnostic Centre, House 7, Zakir Hossain Road, Khulshi, Chattogram 4225' },
  { id: 'ch-003', slug: 'banani',
    about: [
      'The Dhaka Banani chamber brings Dr. Nabila’s arthroscopy and sports-injury expertise to patients in the capital. Thursday evenings and Friday mornings are set aside for new consultations, second opinions and post-operative reviews, so out-of-town patients can plan a single trip.',
      'Banani Orthocare Hospital offers imaging and rehabilitation support, and cases needing surgery are guided through a clear pathway, either in Dhaka or at Port City Specialized Hospital in Chattogram, according to what suits you best.'],
    landmark: 'Off Road 11 in Block D, close to the Kemal Ataturk Avenue side of Banani',
    facilities: [
      { icon: 'car', title: 'Hospital parking', description: 'Parking for patients within the hospital compound and nearby side streets.' },
      { icon: 'wheelchair', title: 'Accessible entrance', description: 'Ramp access, lifts and assistance from the reception team.' },
      { icon: 'activity', title: 'Imaging on site', description: 'Digital X-ray and MRI reporting arranged during your visit.' },
      { icon: 'heart', title: 'Physiotherapy referral', description: 'Rehabilitation sessions arranged with the hospital’s physiotherapy team.' },
      { icon: 'building', title: 'Corporate & insurance desk', description: 'Help with corporate panels, pre-approvals and insurance paperwork.' },
      { icon: 'wifi', title: 'Comfortable waiting lounge', description: 'Air-conditioned lounge with Wi-Fi and refreshments for patients and families.' }],
    howToReach: {
      byRoad: 'From Gulshan or Mohakhali, reach Kemal Ataturk Avenue and turn into Banani Road 11. The hospital is at House 38, Block D.',
      byRideshare: 'Uber and Pathao pick-ups work smoothly in Banani. Set the destination to Banani Orthocare Hospital, Road 11.',
      byBus: 'Buses along Kemal Ataturk Avenue stop near Road 11. Banani railway station is about ten minutes away by rickshaw.',
      parking: 'Limited parking is inside the compound; additional space is on Road 11. Arrive 20 minutes early on Thursday evenings.' },
    surgeryDays: 'Consultations are on Thursday evenings and Friday mornings; surgery is planned in Dhaka or at Port City Specialized Hospital.',
    patientTips: ['Thursday evenings fill quickly; reserve your slot a week ahead.', 'Travelling from outside Dhaka? Choose the Friday-morning slot for an easier journey.', 'Carry your NID or passport copy for registration and insurance verification.', 'Bring digital copies of scans on your phone as well as printed films.'],
    mapQuery: 'Banani Orthocare Hospital, House 38, Road 11, Block D, Banani, Dhaka 1213' }
];
