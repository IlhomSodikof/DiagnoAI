
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet uchun marker icon sozlash
const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock ma'lumotlar
const mockDrugs = [
  {
    id: 1,
    name: "Amoksitsillin",
    manufacturer: "BioPharm",
    composition: "Har bir kapsulada 500 mg amoksitsillin",
    usage: "Bakterial infektsiyalar",
    price: 15000,
    requiresPrescription: true,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/427/725/7255672787891860.webp"
  },
  {
    id: 2,
    name: "Ibuprofen",
    manufacturer: "MediCare",
    composition: "Har bir tabletkada 400 mg ibuprofen",
    usage: "Yallig'lanish, og'riq, isitma",
    price: 8000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/297/066/0662892876368745.webp"
  },
  {
    id: 3,
    name: "Paratsetamol",
    manufacturer: "PharmLine",
    composition: "Har bir tabletkada 500 mg paratsetamol",
    usage: "Ishqalanish, bosh og'rig'i, tana haroratini pasaytirish",
    price: 5000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/110/243/243608739867739.webp"
  },
  {
    id: 4,
    name: "Nimesil",
    manufacturer: "Berlin-Chemie",
    composition: "Har bir paketda 100 mg nimesulid",
    usage: "Og'riq va yallig'lanish",
    price: 25000,
    requiresPrescription: true,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/262/538/5388942173480737.webp"
  },


  {
    id: 7,
    name: "Smecta",
    manufacturer: "Ipsen",
    composition: "Har bir paketda 3 g diosmektit",
    usage: "Diareya",
    price: 12000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/806/935/935912846495147.webp"
  },
  {
    id: 8,
    name: "Zodak",
    manufacturer: "Zentiva",
    composition: "Har bir tabletkada 10 mg setirizin",
    usage: "Allergiya",
    price: 15000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/317/505/50583185722575.webp"
  },
  {
    id: 9,
    name: "Mezim Forte",
    manufacturer: "Berlin-Chemie",
    composition: "Pankreatik fermentlar",
    usage: "Ovqat hazm qilish muammolari",
    price: 20000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/122/979/9790284184983108.webp"
  },
  {
    id: 10,
    name: "Arbidol",
    manufacturer: "Pharmstandard",
    composition: "Har bir tabletkada 50 mg umifenovir",
    usage: "Virusli infektsiyalar",
    price: 22000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/142/935/9359292249742333.webp"
  },
  {
    id: 11,
    name: "Espumizan",
    manufacturer: "Berlin-Chemie",
    composition: "Har bir kapsulada 40 mg simetikon",
    usage: "Qorin shishi",
    price: 18000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/527/891/8915672787891860.webp"
  },
  {
    id: 12,
    name: "Validol",
    manufacturer: "Tatkhimfarmpreparaty",
    composition: "Har bir tabletkada 60 mg mentol",
    usage: "Yurak og'rig'i",
    price: 5000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/465/840/8406031541941651.webp"
  },
  {
    id: 13,
    name: "Fervex",
    manufacturer: "UPSA",
    composition: "Paratsetamol, feniramin, askorbin kislota",
    usage: "Shamollash alomatlari",
    price: 25000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/193/183/1837303450507431.webp"
  },
  {
    id: 14,
    name: "Lozap",
    manufacturer: "Zentiva",
    composition: "Har bir tabletkada 50 mg losartan",
    usage: "Qon bosimi",
    price: 30000,
    requiresPrescription: true,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/314/255/2554084002128688.webp"
  },
  {
    id: 15,
    name: "Omeprazol",
    manufacturer: "Gedeon Richter",
    composition: "Har bir kapsulada 20 mg omeprazol",
    usage: "Oshqozon yarasi",
    price: 12000,
    requiresPrescription: true,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/103/893/8936823851357968.webp"
  },
  {
    id: 16,
    name: "Strepsils",
    manufacturer: "Reckitt Benckiser",
    composition: "Amilmetakrezol, diklorbenzil spirt",
    usage: "Tomoq og'rig'i",
    price: 15000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/283/096/0960242395694959.webp"
  },


  {
    id: 19,
    name: "Bifiform",
    manufacturer: "Ferrosan",
    composition: "Probiotiklar va prebiotiklar",
    usage: "Ichak mikroflorasini tiklash",
    price: 28000,
    requiresPrescription: false,
    image: "https://pharmaclick.uz/upload/Sh/imageCache/207/400/4009633402450881.webp"
  },

];

const OnlinePharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [orders, setOrders] = useState([]);
  const [location, setLocation] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapContainer = useRef(null);
  const synth = useRef(window.speechSynthesis);
  const utterance = useRef(null);
  const selectedDrugRef = useRef(null); // Yangi: selectedDrug ni saqlash uchun ref

  // Alfavit tartibida dorilar ro'yxati
  const sortedDrugs = [...mockDrugs].sort((a, b) => a.name.localeCompare(b.name));

  // Qidiruv natijalari
  const filteredDrugs = sortedDrugs.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.composition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Foydalaniladigan dorilar ro'yxati
  const displayDrugs = isSearching ? filteredDrugs : sortedDrugs;

  // Ovozli yordamchi
  const speak = (text) => {
    if (synth.current.speaking) {
      synth.current.cancel();
    }

    utterance.current = new SpeechSynthesisUtterance(text);
    utterance.current.lang = 'uz-UZ';
    synth.current.speak(utterance.current);
  };

  // Dori haqida ovozli ma'lumot
  const speakDrugInfo = () => {
    if (!selectedDrug) return;

    const text = `
      Dori nomi: ${selectedDrug.name}.
      Ishlab chiqaruvchi: ${selectedDrug.manufacturer}.
      Tarkibi: ${selectedDrug.composition}.
      Qo'llanilishi: ${selectedDrug.usage}.
      Narxi: ${selectedDrug.price} so'm.
      ${selectedDrug.requiresPrescription ? 'Retsept bilan beriladi' : 'Retseptsiz sotiladi'}
    `;

    speak(text);
  };

  // Yetkazib berish vaqtini hisoblash
  const calculateDeliveryTime = () => {
    const minutes = Math.floor(Math.random() * 10) + 10; // 10-20 minut oralig'ida
    const time = `${minutes} daqiqa`;
    setDeliveryTime(time);
    return time;
  };

  // Buyurtma qilish
  const placeOrder = () => {
    // selectedDrugRef orqali tekshiramiz
    if (!selectedDrugRef.current || !location) {
      alert("Iltimos, dori va manzilni tanlang!");
      return;
    }

    const time = calculateDeliveryTime();
    const newOrder = {
      id: Date.now(),
      drugId: selectedDrugRef.current.id,
      drugName: selectedDrugRef.current.name,
      price: selectedDrugRef.current.price,
      date: new Date().toLocaleString(),
      status: 'Yetkazilmoqda',
      location: location,
      deliveryTime: time,
      image: selectedDrugRef.current.image
    };

    setOrders([...orders, newOrder]);
    setShowMap(false);
    setSelectedDrug(null);
    setLocation('');
    setDeliveryTime('');

    // 5 daqiqadan so'ng statusni o'zgartirish
    setTimeout(() => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === newOrder.id ? { ...order, status: 'Yetkazib berildi' } : order
        )
      );
    }, 300000); // 5 daqiqa = 300000 millisekund

    speak(`Sizning ${selectedDrugRef.current.name} dori buyurtmangiz qabul qilindi. Yetkazib berish vaqti: ${time}`);
  };

  // Leaflet xaritasini ishga tushirish
  useEffect(() => {
    if (showMap && !map && mapContainer.current) {
      const leafletMap = L.map(mapContainer.current, {
        center: [41.311081, 69.240562],
        zoom: 12
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMap);

      setMap(leafletMap);

      // Xaritada joy tanlash
      leafletMap.on('click', (e) => {
        const { lat, lng } = e.latlng;

        if (marker) {
          leafletMap.removeLayer(marker);
        }

        const newMarker = L.marker([lat, lng], { icon: defaultIcon })
          .addTo(leafletMap)
          .bindPopup(`Siz tanlagan joy: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
          .openPopup();

        setMarker(newMarker);
        setLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        calculateDeliveryTime();

        // Reverse geocoding (nominatim API)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            setLocation(address);
            newMarker.setPopupContent(`Manzil: ${address}`).openPopup();
          });
      });
    }

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [showMap]);

  // selectedDrug o'zgarganda ref ni yangilash
  useEffect(() => {
    selectedDrugRef.current = selectedDrug;
  }, [selectedDrug]);

  // Qidiruvni boshlash
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsSearching(e.target.value.length > 0);
  };

  // Dori tanlash
  const handleSelectDrug = (drug) => {
    setSelectedDrug(drug);
    setIsSearching(false);
    setSearchTerm('');
  };

  return (
    <div className=" bg-gray-100 p-4">
      <div className="max-w-8xl mx-5">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Online Dorixona</h1>

        {/* Qidiruv qismi */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Dori nomi yoki tarkibini kiriting..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setSearchTerm('');
                  setIsSearching(false);
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Asosiy kontent */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Dorilar ro'yxati */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">
                {isSearching ? 'Qidiruv natijalari' : 'Barcha dorilar'}
              </h2>

              {displayDrugs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayDrugs.map(drug => (
                    <div
                      key={drug.id}
                      className={`p-4 border rounded-xl cursor-pointer hover:shadow-md transition-all ${selectedDrug?.id === drug.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                      onClick={() => handleSelectDrug(drug)}
                    >
                      <div className="flex flex-col h-full">
                        <img
                          src={drug.image}
                          alt={drug.name}
                          className="w-full h-32 object-contain mb-3"
                        />
                        <h3 className="font-medium text-lg">{drug.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{drug.manufacturer}</p>
                        <p className="text-blue-600 font-semibold mt-auto">{drug.price.toLocaleString()} so'm</p>
                        <button
                          className="mt-2 bg-blue-100 text-blue-700 text-sm py-1 px-2 rounded-lg hover:bg-blue-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectDrug(drug);
                          }}
                        >
                          Batafsil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Hech qanday natija topilmadi
                </div>
              )}
            </div>
          </div>

          {/* Buyurtmalar tarixi */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 h-[calc(100vh-32px)] overflow-hidden flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-blue-800">Buyurtmalar tarixi</h2>

              {orders.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-gray-500 text-center">Hozircha buyurtmalar mavjud emas</p>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto space-y-3 pr-2">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className={`border rounded-lg p-3 ${order.status === 'Yetkazib berildi' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
                        }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={order.image}
                          alt={order.drugName}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{order.drugName}</h3>
                            <span className={`text-sm font-medium ${order.status === 'Yetkazib berildi' ? 'text-green-600' : 'text-yellow-600'
                              }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{order.date}</p>
                          <p className="text-sm mt-1">
                            <span className="font-medium">Yetkazish:</span> {order.deliveryTime}
                          </p>
                          {/* <p className="text-xs inline-block text-gray-500 truncate" title={order.location}>
                            {order.location}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dori ma'lumotlari modali */}
      {selectedDrug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-800">{selectedDrug.name}</h2>
                <button
                  onClick={() => setSelectedDrug(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={selectedDrug.image}
                    alt={selectedDrug.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700">Ishlab chiqaruvchi:</h3>
                    <p>{selectedDrug.manufacturer}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700">Narxi:</h3>
                    <p className="text-red-600 font-semibold">{selectedDrug.price.toLocaleString()} so'm</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700">Tarkibi:</h3>
                    <p>{selectedDrug.composition}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700">Qo'llanilishi:</h3>
                    <p>{selectedDrug.usage}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700">Retsept:</h3>
                    <p>{selectedDrug.requiresPrescription ? 'Retsept bilan beriladi' : 'Retseptsiz sotiladi'}</p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={speakDrugInfo}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <span>🔊</span> Ovozli ma'lumot
                    </button>

                    <button
                      onClick={() => {
                        setShowMap(true);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Buyurtma qilish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Xarita modali (Leaflet) */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Yetkazib berish manzilini belgilang</h2>
                <button
                  onClick={() => {
                    setShowMap(false);
                    setLocation('');
                    setDeliveryTime('');
                    if (map) map.remove();
                    setMap(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div
                ref={mapContainer}
                className="h-96 w-full rounded-lg mb-4 bg-gray-200"
                style={{ minHeight: '400px' }}
              >
                {/* Leaflet xarita shu yerga yuklanadi */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tanlangan manzil:</label>
                <input
                  type="text"
                  placeholder="Manzilni kiriting yoki xaritadan tanlang"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* {deliveryTime && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">Yetkazib berish vaqti: <span className="text-blue-600">{deliveryTime}</span></p>
                </div>
              )} */}

              <div className="flex justify-start gap-3">
                {deliveryTime && (
                  <div className="mb-2 p-3  rounded-lg">
                    <p className="font-medium">Yetkazib berish vaqti: <span className="text-blue-600">{deliveryTime}</span></p>
                  </div>
                )}
                <button
                  onClick={() => {
                    setShowMap(false);
                    setLocation('');
                    setDeliveryTime('');
                    if (map) map.remove();
                    setMap(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600"
                >
                  Bekor qilish
                </button>

                <button
                  onClick={placeOrder}
                  disabled={!location || !selectedDrugRef.current}
                  className={`px-4 py-1 rounded-lg ${location && selectedDrugRef.current ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                    } text-white`}
                >
                  Buyurtmani tasdiqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlinePharmacy;

