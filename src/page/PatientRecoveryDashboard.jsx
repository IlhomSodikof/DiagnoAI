import React, { useState } from 'react';
import {
  FiActivity, FiTrendingUp, FiTrendingDown,
  FiCalendar, FiFilter, FiDownload, FiPrinter,
  FiHeart, FiAlertCircle, FiCheckCircle
} from 'react-icons/fi';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import BredCumb from '../components/BredCumb';

const PatientRecoveryDashboard = () => {
  // Mock bemor ma'lumotlari
  const mockPatient = {
    id: 'P-10025',
    name: 'Ali Valiyev',
    age: 58,
    gender: 'Erkak',
    diagnosis: 'Yurak yetishmovchiligi (I50.9)',
    admissionDate: '2023-10-15',
    doctor: 'Dr. Nodira Xalilova'
  };

  // Statistik ma'lumotlar
  const recoveryStats = {
    daily: generateDailyStats(30),
    weekly: generateWeeklyStats(12),
    monthly: generateMonthlyStats(6)
  };

  const [timeRange, setTimeRange] = useState('daily');
  const [chartType, setChartType] = useState('line');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [showNorm, setShowNorm] = useState(true);

  // Grafik ranglari
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Metrikalar
  const metrics = [
    { key: 'heartRate', name: 'Yurak urishi', unit: 'bpm', normalRange: [60, 100] },
    { key: 'bloodPressure', name: 'Qon bosimi', unit: 'mmHg', normalRange: [90, 120] },
    { key: 'temperature', name: 'Tana harorati', unit: '°C', normalRange: [36.1, 37.2] },
    { key: 'oxygenLevel', name: 'Kislorod darajasi', unit: '%', normalRange: [95, 100] },
    { key: 'painLevel', name: "Og'riq darajasi", unit: '/10', normalRange: [0, 3] }
  ];

  // Tanlangan ma'lumotlar
  const currentData = recoveryStats[timeRange];
  const filteredData = filterData(currentData, selectedMetric, showNorm);

  // Grafik komponentini tanlash
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      default:
        return renderLineChart();
    }
  };

  // Chiziqli grafik
  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={400}>

      <LineChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={timeRange === 'daily' ? 'day' : timeRange === 'weekly' ? 'week' : 'month'}
          tick={{ fontSize: 12 }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        {selectedMetric === 'all' ? (
          metrics.map((metric, index) => (
            <Line
              key={metric.key}
              type="monotone"
              dataKey={metric.key}
              name={`${metric.name} (${metric.unit})`}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))
        ) : (
          <Line
            type="monotone"
            dataKey={selectedMetric}
            name={metrics.find(m => m.key === selectedMetric)?.name || ''}
            stroke="#0088FE"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        )}
        {showNorm && selectedMetric !== 'all' && (
          <>
            <Line
              type="monotone"
              dataKey={`${selectedMetric}NormMax`}
              name="Normal max"
              stroke="#FF0000"
              strokeDasharray="5 5"
              strokeWidth={1}
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey={`${selectedMetric}NormMin`}
              name="Normal min"
              stroke="#FF0000"
              strokeDasharray="5 5"
              strokeWidth={1}
              dot={false}
              activeDot={false}
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  // Stolbi grafik
  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={timeRange === 'daily' ? 'day' : timeRange === 'weekly' ? 'week' : 'month'}
          tick={{ fontSize: 12 }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        {selectedMetric === 'all' ? (
          metrics.map((metric, index) => (
            <Bar
              key={metric.key}
              dataKey={metric.key}
              name={`${metric.name} (${metric.unit})`}
              fill={COLORS[index % COLORS.length]}
            />
          ))
        ) : (
          <Bar
            dataKey={selectedMetric}
            name={metrics.find(m => m.key === selectedMetric)?.name || ''}
            fill="#0088FE"
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );

  // Pasta grafik (faqat bir metrika uchun)
  const renderPieChart = () => {
    if (selectedMetric === 'all') return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Pasta grafik faqat bitta metrika tanlanganida ko'rsatiladi
      </div>
    );

    const metricData = metrics.find(m => m.key === selectedMetric);
    const lastValue = filteredData[filteredData.length - 1][selectedMetric];
    const isNormal = lastValue >= (metricData?.normalRange[0] || 0) &&
      lastValue <= (metricData?.normalRange[1] || 100);

    const pieData = [
      { name: 'Joriy qiymat', value: lastValue },
      { name: 'Qolgan', value: (metricData?.normalRange[1] || 100) - lastValue }
    ];

    return (
      <div className="flex flex-col items-center bg-amber-300">
        <BredCumb page="EKG" />
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              <Cell fill={isNormal ? "#00C49F" : "#FF8042"} />
              <Cell fill="#EEE" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className={`mt-2 px-3 py-1 rounded-full ${isNormal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {lastValue} {metricData?.unit} - {isNormal ? 'Normal' : 'Anomal'}
        </div>
      </div>
    );
  };

  // Progress indikatorlari
  const renderProgressIndicators = () => {
    const lastData = filteredData[filteredData.length - 1];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">

        {metrics.map((metric, index) => {
          const value = lastData[metric.key];
          const isNormal = value >= metric.normalRange[0] && value <= metric.normalRange[1];
          const trend = getTrend(currentData, metric.key);

          return (
            <div key={metric.key} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">{metric.name}</h4>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-semibold">{value}</span>
                    <span className="ml-1 text-sm text-gray-500">{metric.unit}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    {trend === 'up' ? (
                      <FiTrendingUp className="text-red-500 mr-1" />
                    ) : trend === 'down' ? (
                      <FiTrendingDown className="text-green-500 mr-1" />
                    ) : (
                      <FiActivity className="text-gray-400 mr-1" />
                    )}
                    <span className={`text-xs ${isNormal ? 'text-green-600' : 'text-red-600'}`}>
                      {isNormal ? 'Normal' : 'Anomal'} ({metric.normalRange[0]}-{metric.normalRange[1]})
                    </span>
                  </div>
                </div>
                <div className={`p-2 rounded-full ${isNormal ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isNormal ? <FiCheckCircle /> : <FiAlertCircle />}
                </div>
              </div>
              <div className="mt-3">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-gray-600">
                        Progress
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block">
                        {Math.round((value - metric.normalRange[0]) / (metric.normalRange[1] - metric.normalRange[0]) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mt-1 text-xs flex rounded bg-gray-200">
                    <div
                      style={{
                        width: `${Math.min(Math.max((value - metric.normalRange[0]) / (metric.normalRange[1] - metric.normalRange[0]) * 100, 0), 100)}%`,
                        backgroundColor: isNormal ? '#10B981' : '#EF4444'
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Bemor sarlavhasi */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{mockPatient.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <span>ID: {mockPatient.id}</span>
              <span>Yosh: {mockPatient.age}</span>
              <span>Jins: {mockPatient.gender}</span>
              <span>Tashxis: {mockPatient.diagnosis}</span>
              <span>Shifokor: {mockPatient.doctor}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium flex items-center hover:bg-gray-50">
              <FiDownload className="mr-2" /> Yuklab olish
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium flex items-center hover:bg-gray-50">
              <FiPrinter className="mr-2" /> Chop etish
            </button>
          </div>
        </div>
      </div>
      <BredCumb page="Statistika" />
      {/* Boshqaruv paneli */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <h3 className="text-sm font-medium text-gray-500">Filtrlar:</h3>
          </div>

          <div className="grid grid-cols-2 md:flex gap-2">
            {/* Vaqt oralig'i */}
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="daily">Kunlik</option>
                <option value="weekly">Haftalik</option>
                <option value="monthly">Oylik</option>
              </select>
              <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            {/* Metrika */}
            <div className="relative">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Barcha ko'rsatkichlar</option>
                {metrics.map(metric => (
                  <option key={metric.key} value={metric.key}>{metric.name}</option>
                ))}
              </select>
              <FiActivity className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            {/* Grafik turi */}
            <div className="relative">
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="line">Chiziqli grafik</option>
                <option value="bar">Stolbi grafik</option>
                <option value="pie">Pasta grafik</option>
              </select>
              <FiTrendingUp className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            {/* Normal diapazon */}
            {selectedMetric !== 'all' && (
              <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={showNorm}
                  onChange={() => setShowNorm(!showNorm)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2"
                />
                Normal diapazon
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Asosiy grafik */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {timeRange === 'daily' ? 'Kunlik' : timeRange === 'weekly' ? 'Haftalik' : 'Oylik'}
          {' '}taraqqiyot ko'rsatkichlari
        </h3>
        <div className="h-80 md:h-96">
          {renderChart()}
        </div>
      </div>

      {/* Progress indikatorlari */}
      {renderProgressIndicators()}

      {/* Izohlar va tahlillar */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Shifokor tahlillari</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="text-sm text-gray-500">2023-11-15 - Dr. Nodira Xalilova</div>
            <p className="mt-1 text-gray-800">
              Bemorning yurak urishi tezligi normaga yaqinlashmoqda. Beta-blokerlar dozasini 12.5 mg dan 25 mg ga oshirildi.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="text-sm text-gray-500">2023-11-10 - Dr. Nodira Xalilova</div>
            <p className="mt-1 text-gray-800">
              Kislorod to'yinishi yaxshilanmoqda, ammo hali ham past. Nafas olish mashqlarini davom ettirish tavsiya etiladi.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="text-sm text-gray-500">2023-11-05 - Dr. Nodira Xalilova</div>
            <p className="mt-1 text-gray-800">
              Dastlabki tekshiruv. Bemorda aniq yurak yetishmovchiligi belgilari aniqlangan. ECG va qon tahlillari buyurildi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Yordamchi funksiyalar
function generateDailyStats(days) {
  const stats = [];
  for (let i = 0; i < days; i++) {
    const day = i + 1;
    const baseHeartRate = 85 - (i * 0.5);
    const basePressure = 135 - (i * 0.7);

    stats.push({
      day: `Kun ${day}`,
      heartRate: Math.round(baseHeartRate + (Math.random() * 5 - 2.5)),
      bloodPressure: Math.round(basePressure + (Math.random() * 5 - 2.5)),
      temperature: +(36.5 + (Math.random() * 0.8 - 0.4)).toFixed(1),
      oxygenLevel: Math.round(92 + (i * 0.3) + (Math.random() * 3 - 1.5)),
      painLevel: Math.max(0, Math.round(6 - (i * 0.2) + (Math.random() * 1 - 0.5))),
      heartRateNormMin: 60,
      heartRateNormMax: 100,
      bloodPressureNormMin: 90,
      bloodPressureNormMax: 120,
      temperatureNormMin: 36.1,
      temperatureNormMax: 37.2,
      oxygenLevelNormMin: 95,
      oxygenLevelNormMax: 100,
      painLevelNormMin: 0,
      painLevelNormMax: 3
    });
  }
  return stats;
}

function generateWeeklyStats(weeks) {
  const stats = [];
  for (let i = 0; i < weeks; i++) {
    const week = i + 1;
    const baseHeartRate = 88 - (i * 2);
    const basePressure = 140 - (i * 3);

    stats.push({
      week: `Hafta ${week}`,
      heartRate: Math.round(baseHeartRate + (Math.random() * 5 - 2.5)),
      bloodPressure: Math.round(basePressure + (Math.random() * 5 - 2.5)),
      temperature: +(36.5 + (Math.random() * 0.6 - 0.3)).toFixed(1),
      oxygenLevel: Math.round(90 + (i * 1.5) + (Math.random() * 3 - 1.5)),
      painLevel: Math.max(0, Math.round(7 - (i * 0.7) + (Math.random() * 1 - 0.5))),
      heartRateNormMin: 60,
      heartRateNormMax: 100,
      bloodPressureNormMin: 90,
      bloodPressureNormMax: 120,
      temperatureNormMin: 36.1,
      temperatureNormMax: 37.2,
      oxygenLevelNormMin: 95,
      oxygenLevelNormMax: 100,
      painLevelNormMin: 0,
      painLevelNormMax: 3
    });
  }
  return stats;
}

function generateMonthlyStats(months) {
  const stats = [];
  for (let i = 0; i < months; i++) {
    const month = i + 1;
    const baseHeartRate = 90 - (i * 4);
    const basePressure = 145 - (i * 6);

    stats.push({
      month: months === 6 ?
        ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun'][i] :
        `Oy ${month}`,
      heartRate: Math.round(baseHeartRate + (Math.random() * 5 - 2.5)),
      bloodPressure: Math.round(basePressure + (Math.random() * 5 - 2.5)),
      temperature: +(36.5 + (Math.random() * 0.4 - 0.2)).toFixed(1),
      oxygenLevel: Math.round(88 + (i * 2.5) + (Math.random() * 3 - 1.5)),
      painLevel: Math.max(0, Math.round(8 - (i * 1.2) + (Math.random() * 1 - 0.5))),
      heartRateNormMin: 60,
      heartRateNormMax: 100,
      bloodPressureNormMin: 90,
      bloodPressureNormMax: 120,
      temperatureNormMin: 36.1,
      temperatureNormMax: 37.2,
      oxygenLevelNormMin: 95,
      oxygenLevelNormMax: 100,
      painLevelNormMin: 0,
      painLevelNormMax: 3
    });
  }
  return stats;
}

function filterData(data, selectedMetric, showNorm) {
  if (selectedMetric === 'all') return data;

  const metricData = data.map(item => {
    const filteredItem = {
      ...item,
      [selectedMetric]: item[selectedMetric]
    };

    if (showNorm) {
      filteredItem[`${selectedMetric}NormMin`] = item[`${selectedMetric}NormMin`];
      filteredItem[`${selectedMetric}NormMax`] = item[`${selectedMetric}NormMax`];
    }

    return filteredItem;
  });

  return metricData;
}

function getTrend(data, metric) {
  if (data.length < 2) return 'stable';

  const last = data[data.length - 1][metric];
  const prev = data[data.length - 2][metric];

  if (last > prev + (prev * 0.05)) return 'up';
  if (last < prev - (prev * 0.05)) return 'down';
  return 'stable';
}

export default PatientRecoveryDashboard;