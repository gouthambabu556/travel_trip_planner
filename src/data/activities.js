// Ready-made activity ideas shown inside a trip's itinerary page.
//
// - BY_PLACE is keyed by the destination name in lower case. To give a new
//   place its own ideas, add another entry here (e.g. "coorg": [...]).
// - Places without an entry fall back to BY_CATEGORY (Beach, Mountain, ...).
//
// Each activity: title, location, time (24h default), duration, tag, tip.

const BY_PLACE = {
  munnar: [
    {
      title: "Tea garden walk & tea museum",
      location: "Tea estates, Munnar",
      time: "09:00",
      duration: "2–3 hrs",
      tag: "Culture",
      tip: "See how tea is grown and processed. Check the museum's opening days before you go."
    },
    {
      title: "Eravikulam National Park",
      location: "Rajamala, Eravikulam NP",
      time: "08:30",
      duration: "3 hrs",
      tag: "Nature",
      tip: "Home of the Nilgiri tahr. Tickets are limited and the park closes in the calving season, so check ahead."
    },
    {
      title: "Mattupetty Dam & boating",
      location: "Mattupetty Dam",
      time: "11:30",
      duration: "1–2 hrs",
      tag: "Water",
      tip: "Boat ride on the reservoir. Echo Point is nearby, so combine both."
    },
    {
      title: "Top Station viewpoint",
      location: "Top Station",
      time: "10:00",
      duration: "2 hrs",
      tag: "Sightseeing",
      tip: "Best views of the Western Ghats on clear mornings, before the mist rolls in."
    },
    {
      title: "Attukad waterfalls",
      location: "Attukad, near Pallivasal",
      time: "15:00",
      duration: "1–2 hrs",
      tag: "Nature",
      tip: "Easy stop between tea gardens. Wear shoes with grip, because the rocks get slippery."
    },
    {
      title: "Sunrise jeep ride at Kolukkumalai",
      location: "Kolukkumalai",
      time: "04:30",
      duration: "4–5 hrs",
      tag: "Adventure",
      tip: "A rough jeep ride up to one of the highest tea estates. Start before dawn and carry a jacket."
    },
    {
      title: "Spice plantation visit",
      location: "Spice gardens, Munnar",
      time: "14:30",
      duration: "1–2 hrs",
      tag: "Shopping",
      tip: "Guided walk through cardamom, pepper and clove plants. Good place to buy spices."
    }
  ],

  alappuzha: [
    {
      title: "Houseboat cruise on the backwaters",
      location: "Vembanad Lake & Alappuzha backwaters",
      time: "12:00",
      duration: "Full day / overnight",
      tag: "Water",
      tip: "Stay on a traditional kettuvallam. Meals are cooked on board, so book early in peak season."
    },
    {
      title: "Canoe ride through village canals",
      location: "Kuttanad canals",
      time: "08:00",
      duration: "2 hrs",
      tag: "Water",
      tip: "Small canoes reach narrow canals that houseboats can't. Morning is cooler and the light is better."
    },
    {
      title: "Alappuzha beach & lighthouse",
      location: "Alappuzha Beach",
      time: "16:30",
      duration: "2 hrs",
      tag: "Sightseeing",
      tip: "Walk to the old pier and climb the lighthouse for sunset views."
    },
    {
      title: "Kuttanad paddy field village walk",
      location: "Kuttanad",
      time: "09:00",
      duration: "2 hrs",
      tag: "Nature",
      tip: "Farming happens below sea level here. Ask your host to arrange a local guide."
    },
    {
      title: "Marari Beach relaxation",
      location: "Marari Beach",
      time: "10:00",
      duration: "3 hrs",
      tag: "Relax",
      tip: "A quiet, uncrowded beach north of Alappuzha. Good for a slow half-day."
    },
    {
      title: "Pathiramanal island boat trip",
      location: "Pathiramanal Island, Vembanad Lake",
      time: "07:30",
      duration: "3–4 hrs",
      tag: "Nature",
      tip: "A small island known for birdlife. Go early; boat timings depend on the operator."
    },
    {
      title: "Coir village visit",
      location: "Coir workshops, Alappuzha",
      time: "11:00",
      duration: "1–2 hrs",
      tag: "Culture",
      tip: "See coconut fibre being spun into rope and mats, a traditional local industry."
    },
    {
      title: "Kerala meal: karimeen & appam",
      location: "Local toddy shop / homestay",
      time: "13:30",
      duration: "1 hr",
      tag: "Food",
      tip: "Try karimeen (pearl spot fish) fry with appam and Kerala-style curries."
    }
  ],

  goa: [
    {
      title: "Baga & Calangute beach day",
      location: "Baga / Calangute, North Goa",
      time: "10:00",
      duration: "3–4 hrs",
      tag: "Relax",
      tip: "The busiest beaches, with shacks, sunbeds and plenty of food options."
    },
    {
      title: "Water sports at Baga",
      location: "Baga Beach",
      time: "11:00",
      duration: "2 hrs",
      tag: "Adventure",
      tip: "Parasailing, jet ski and banana boat rides. Compare prices and check the operator's safety gear."
    },
    {
      title: "Fort Aguada & lighthouse",
      location: "Fort Aguada, Candolim",
      time: "16:00",
      duration: "1–2 hrs",
      tag: "Sightseeing",
      tip: "A 17th-century Portuguese fort with sea views. Come late afternoon for softer light."
    },
    {
      title: "Old Goa churches",
      location: "Basilica of Bom Jesus & Se Cathedral, Old Goa",
      time: "09:30",
      duration: "2–3 hrs",
      tag: "Culture",
      tip: "UNESCO-listed churches. Cover your shoulders and knees when entering."
    },
    {
      title: "Dudhsagar Falls trip",
      location: "Dudhsagar Falls, Mollem",
      time: "08:00",
      duration: "Full day",
      tag: "Nature",
      tip: "Reached by jeep safari. Access can be limited in the monsoon, so confirm before you plan it."
    },
    {
      title: "Fontainhas heritage walk",
      location: "Fontainhas, Panjim",
      time: "10:00",
      duration: "2 hrs",
      tag: "Culture",
      tip: "Colourful Latin Quarter with Portuguese-era houses, cafés and galleries."
    },
    {
      title: "Sunset river cruise",
      location: "Mandovi River, Panjim",
      time: "18:00",
      duration: "1 hr",
      tag: "Water",
      tip: "Evening cruises often include live music and Goan folk performances."
    },
    {
      title: "Chapora Fort sunset",
      location: "Chapora Fort, Vagator",
      time: "17:00",
      duration: "1–2 hrs",
      tag: "Sightseeing",
      tip: "A short climb to a ruined fort with a view over Vagator beach."
    },
    {
      title: "Palolem Beach day (South Goa)",
      location: "Palolem Beach",
      time: "10:00",
      duration: "Half day",
      tag: "Relax",
      tip: "A calmer, curved beach in South Goa, a good change from the busy north."
    }
  ],

  jaipur: [
    {
      title: "Amber Fort",
      location: "Amer Fort, Amer",
      time: "09:00",
      duration: "3 hrs",
      tag: "Sightseeing",
      tip: "Arrive at opening to beat the crowds and the heat. Walk or take a jeep up to the fort."
    },
    {
      title: "City Palace",
      location: "City Palace, Old City",
      time: "11:00",
      duration: "2 hrs",
      tag: "Culture",
      tip: "Part of the palace is still the royal family's residence. Museum galleries show costumes and weapons."
    },
    {
      title: "Hawa Mahal photo stop",
      location: "Hawa Mahal, Badi Choupad",
      time: "08:00",
      duration: "1 hr",
      tag: "Sightseeing",
      tip: "The façade glows in morning sun. Cafés opposite give the best view."
    },
    {
      title: "Jantar Mantar observatory",
      location: "Jantar Mantar, near City Palace",
      time: "13:30",
      duration: "1 hr",
      tag: "Culture",
      tip: "A UNESCO site with giant astronomical instruments. A guide makes it much clearer."
    },
    {
      title: "Nahargarh Fort sunset",
      location: "Nahargarh Fort",
      time: "16:30",
      duration: "2 hrs",
      tag: "Sightseeing",
      tip: "Views over the whole pink city. Stay for the evening lights."
    },
    {
      title: "Bazaar shopping",
      location: "Johari Bazaar & Bapu Bazaar",
      time: "17:00",
      duration: "2–3 hrs",
      tag: "Shopping",
      tip: "Jewellery, block-print textiles, juttis and lac bangles. Bargain politely."
    },
    {
      title: "Jal Mahal photo stop",
      location: "Man Sagar Lake",
      time: "15:30",
      duration: "30 min",
      tag: "Sightseeing",
      tip: "The palace sits in the lake and is viewed from the road, as there is no entry inside."
    },
    {
      title: "Rajasthani dinner & folk show",
      location: "Village-style restaurant near Jaipur",
      time: "19:30",
      duration: "2–3 hrs",
      tag: "Food",
      tip: "Dal baati churma and traditional dance. Many venues run evening shows."
    }
  ],

  manali: [
    {
      title: "Solang Valley activities",
      location: "Solang Valley",
      time: "09:30",
      duration: "3–4 hrs",
      tag: "Adventure",
      tip: "Paragliding, zorbing and ropeway in summer, skiing in winter. Check the operator's safety record."
    },
    {
      title: "Atal Tunnel & Lahaul drive",
      location: "Atal Tunnel to Sissu",
      time: "08:00",
      duration: "Full day",
      tag: "Sightseeing",
      tip: "A scenic drive through the tunnel into Lahaul. Carry warm clothes even in summer."
    },
    {
      title: "Rohtang Pass visit",
      location: "Rohtang Pass",
      time: "07:00",
      duration: "Full day",
      tag: "Adventure",
      tip: "Needs a permit and is closed in winter and in bad weather, so check the current rules first."
    },
    {
      title: "Hadimba Temple & cedar forest",
      location: "Hadimba Devi Temple",
      time: "09:00",
      duration: "1–2 hrs",
      tag: "Culture",
      tip: "A wooden temple among deodar trees. Go early for fewer crowds."
    },
    {
      title: "Old Manali café walk",
      location: "Old Manali",
      time: "16:00",
      duration: "2–3 hrs",
      tag: "Relax",
      tip: "Riverside cafés, small shops and live music in the evenings."
    },
    {
      title: "Vashisht hot springs",
      location: "Vashisht Village",
      time: "17:00",
      duration: "1–2 hrs",
      tag: "Relax",
      tip: "Natural hot water baths next to an old temple. A good way to end a day of travel."
    },
    {
      title: "Jogini Waterfall trek",
      location: "Jogini Falls, Vashisht",
      time: "10:00",
      duration: "2–3 hrs",
      tag: "Nature",
      tip: "An easy trek from Vashisht. Wear proper shoes, especially after rain."
    },
    {
      title: "River rafting on the Beas",
      location: "Beas River, Kullu",
      time: "10:30",
      duration: "2 hrs",
      tag: "Adventure",
      tip: "Season depends on water levels. Use a registered operator that provides life jackets and helmets."
    }
  ],

  varkala: [
    {
      title: "Papanasam Beach & Janardhana Temple",
      location: "Papanasam Beach, Varkala",
      time: "07:00",
      duration: "1–2 hrs",
      tag: "Culture",
      tip: "A holy beach beside an old temple. Early morning is peaceful."
    },
    {
      title: "North Cliff walk",
      location: "North Cliff, Varkala",
      time: "16:00",
      duration: "2 hrs",
      tag: "Sightseeing",
      tip: "The cliff path has shops, cafés and sea views. Walk along it slowly."
    },
    {
      title: "Sunset at a cliff café",
      location: "North Cliff cafés",
      time: "18:00",
      duration: "1–2 hrs",
      tag: "Food",
      tip: "Fresh seafood and a sea view. Arrive early for a good seat."
    },
    {
      title: "Kappil backwater boat ride",
      location: "Kappil Lake",
      time: "09:00",
      duration: "2 hrs",
      tag: "Water",
      tip: "Calm backwaters where the lake meets the sea. A quieter alternative to Alappuzha."
    },
    {
      title: "Surfing lesson",
      location: "Varkala Beach",
      time: "07:30",
      duration: "2 hrs",
      tag: "Adventure",
      tip: "Beginner lessons are offered by local schools. Check sea conditions and the season."
    },
    {
      title: "Ayurvedic massage or yoga",
      location: "Wellness centres, Varkala",
      time: "11:00",
      duration: "1–2 hrs",
      tag: "Relax",
      tip: "Many centres offer short sessions. Choose a registered centre."
    },
    {
      title: "Sivagiri Mutt visit",
      location: "Sivagiri Mutt",
      time: "10:00",
      duration: "1 hr",
      tag: "Culture",
      tip: "A pilgrimage site linked to Sree Narayana Guru. Dress modestly."
    },
    {
      title: "Anjengo Fort",
      location: "Anjengo (Anchuthengu) Fort",
      time: "15:00",
      duration: "1 hr",
      tag: "Sightseeing",
      tip: "A small 17th-century fort near the sea, a short drive from Varkala."
    }
  ]
};

// Generic ideas used for packages that have no entry above
// (for example places added later by the admin).
const BY_CATEGORY = {
  Beach: [
    { title: "Sunrise beach walk", location: "Main beach", time: "06:30", duration: "1 hr", tag: "Relax", tip: "Quiet, cool and good for photos." },
    { title: "Water sports", location: "Beach activity zone", time: "10:30", duration: "2 hrs", tag: "Adventure", tip: "Use a licensed operator that provides life jackets." },
    { title: "Seafood lunch at a beach shack", location: "Beachfront", time: "13:00", duration: "1 hr", tag: "Food", tip: "Ask what was caught today." },
    { title: "Sunset at the beach", location: "Main beach", time: "17:45", duration: "1–2 hrs", tag: "Sightseeing", tip: "Arrive 30 minutes before sunset." },
    { title: "Local market stroll", location: "Town market", time: "18:30", duration: "1–2 hrs", tag: "Shopping", tip: "Handicrafts and souvenirs." }
  ],
  Mountain: [
    { title: "Sunrise viewpoint", location: "Nearest viewpoint", time: "05:45", duration: "2 hrs", tag: "Sightseeing", tip: "Carry a jacket; it's cold before sunrise." },
    { title: "Short nature trek", location: "Local trail", time: "09:00", duration: "3 hrs", tag: "Adventure", tip: "Hire a local guide and wear proper shoes." },
    { title: "Village visit", location: "Nearby hill village", time: "14:00", duration: "2 hrs", tag: "Culture", tip: "Try local food and say hello to the locals." },
    { title: "Waterfall stop", location: "Nearest waterfall", time: "11:00", duration: "1–2 hrs", tag: "Nature", tip: "Take care on wet rocks." },
    { title: "Evening bonfire & local dinner", location: "Your stay", time: "19:00", duration: "2 hrs", tag: "Relax", tip: "Ask your hosts about regional dishes." }
  ],
  City: [
    { title: "Heritage walk", location: "Old town", time: "08:30", duration: "2–3 hrs", tag: "Culture", tip: "Start early to avoid heat and traffic." },
    { title: "Main museum or palace", location: "City centre", time: "11:30", duration: "2 hrs", tag: "Culture", tip: "Check opening days and ticket prices." },
    { title: "Street food tour", location: "Popular food streets", time: "13:00", duration: "2 hrs", tag: "Food", tip: "Pick busy stalls with high turnover." },
    { title: "Market shopping", location: "Main bazaar", time: "16:30", duration: "2–3 hrs", tag: "Shopping", tip: "Bargain politely." },
    { title: "Evening sightseeing", location: "Landmarks", time: "18:30", duration: "2 hrs", tag: "Sightseeing", tip: "Many landmarks are lit up at night." }
  ],
  Nature: [
    { title: "Wildlife or bird watching", location: "Nearest sanctuary", time: "06:30", duration: "3 hrs", tag: "Nature", tip: "Early morning is best for sightings." },
    { title: "Boat ride", location: "Lake or river", time: "10:00", duration: "1–2 hrs", tag: "Water", tip: "Wear sunscreen and carry water." },
    { title: "Nature walk", location: "Forest or garden trail", time: "08:00", duration: "2 hrs", tag: "Nature", tip: "Stay on marked paths." },
    { title: "Photography stop", location: "Scenic viewpoint", time: "16:00", duration: "1–2 hrs", tag: "Sightseeing", tip: "Golden hour gives the best light." },
    { title: "Local village & food", location: "Nearby village", time: "13:00", duration: "2 hrs", tag: "Culture", tip: "Eat where the locals eat." }
  ],
  Adventure: [
    { title: "Guided trek", location: "Nearest trail", time: "07:00", duration: "4 hrs", tag: "Adventure", tip: "Hire a guide and check the weather." },
    { title: "River rafting or zipline", location: "Adventure camp", time: "10:30", duration: "2 hrs", tag: "Adventure", tip: "Use a registered operator with safety gear." },
    { title: "Cycling trail", location: "Local trails", time: "08:00", duration: "2–3 hrs", tag: "Adventure", tip: "Hire a good bike and carry water." },
    { title: "Camping night", location: "Campsite", time: "17:00", duration: "Overnight", tag: "Relax", tip: "Book ahead and carry warm clothes." },
    { title: "Local guide briefing", location: "Tourist office", time: "09:00", duration: "30 min", tag: "Culture", tip: "Ask about current trail and weather conditions." }
  ]
};

// Returns { items, generic } for a destination object ({ name, category }).
// `generic` is true when the ideas are category-based, not specific to the place.
export function getSuggestedActivities(destination) {
  if (!destination) return { items: [], generic: false };

  // Activities typed in by the admin when adding the package (one per line)
  // take priority over everything else.
  if (Array.isArray(destination.activities) && destination.activities.length > 0) {
    return {
      generic: false,
      items: destination.activities.map((title, index) => ({
        id: `admin-${destination.id}:${index}`,
        title,
        location: destination.name,
        tag: "Suggested"
      }))
    };
  }

  const key = String(destination.name || "").trim().toLowerCase();
  const placeList = BY_PLACE[key];
  const list = placeList || BY_CATEGORY[destination.category] || [];
  const prefix = placeList ? key : `category-${destination.category}`;

  return {
    generic: !placeList,
    items: list.map((item, index) => ({ ...item, id: `${prefix}:${index}` }))
  };
}
