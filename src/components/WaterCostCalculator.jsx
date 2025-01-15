import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const WaterCostCalculator = () => {
  const colors = {
    header: '#00B0F0',      // Azul encabezado
    white: '#FFFFFF',       // Blanco
    lightBlue: '#C9DAF8',   // Azul claro
    aptTitle: '#A61C00',    // Rojo oscuro
    waterValue: '#548135',  // Verde
    garbageValue: '#C55A11', // Naranja
    totalValue: '#990000',  // Rojo
    calculation: '#D9E2F3', // Azul grisáceo
    mediumDays: '#E2EFD9',  // Verde claro
    maxDays: '#FBE4D5',     // Naranja claro
    warning: '#FFC000'      // Amarillo
  };

  const [dates, setDates] = useState({
    apt1: { 
      startYear: 2022, startMonth: 4, startDay: 13,
      endYear: 2022, endMonth: 6, endDay: 13
    },
    apt2: {
      startYear: 2022, startMonth: 4, startDay: 13,
      endYear: 2022, endMonth: 4, endDay: 13
    },
    apt3: {
      startYear: 2022, startMonth: 4, startDay: 13,
      endYear: 2022, endMonth: 5, endDay: 16
    }
  });
  
  const [people, setPeople] = useState({
    apt1: 4,
    apt2: 3,
    apt3: 2
  });
  
  const [bills, setBills] = useState({
    water: 124111,
    garbage: 59080
  });
  
  const [results, setResults] = useState({
    days: {
      apt1: 60,
      apt2: 0,
      apt3: 33
    },
    costs: {
      apt1: { water: 101357, garbage: 42833, total: 144190 },
      apt2: { water: 0, garbage: 0, total: 0 },
      apt3: { water: 22754, garbage: 16247, total: 39001 }
    }
  });

  const calculateDays = (dateInfo) => {
    if (!dateInfo.startYear || !dateInfo.startMonth || !dateInfo.startDay || 
        !dateInfo.endYear || !dateInfo.endMonth || !dateInfo.endDay) {
      return 0;
    }
    
    const start = new Date(
      dateInfo.startYear, 
      dateInfo.startMonth - 1, 
      dateInfo.startDay
    );
    const end = new Date(
      dateInfo.endYear, 
      dateInfo.endMonth - 1, 
      dateInfo.endDay
    );
    
    if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') {
      return 0;
    }
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 60 ? 60 : diffDays;
  };

  useEffect(() => {
    const newDays = {
      apt1: calculateDays(dates.apt1),
      apt2: calculateDays(dates.apt2),
      apt3: calculateDays(dates.apt3)
    };
    
    setResults(prev => ({
      ...prev,
      days: newDays
    }));
  }, [dates]);

  const handleDateChange = (apt, field, value) => {
    setDates(prev => ({
      ...prev,
      [apt]: {
        ...prev[apt],
        [field]: value ? parseInt(value) : ''
      }
    }));
  };

  const cellStyle = "p-2 border text-center";
  const headerStyle = `${cellStyle} text-white font-bold`;
  const inputStyle = "w-full p-2 border rounded text-center";

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6 bg-white">
      {/* Tabla principal de fechas */}
      <table className="w-full border-collapse border mb-8">
        <thead>
          <tr style={{ backgroundColor: colors.header }}>
            <th className={headerStyle}>Apartamento</th>
            <th className={headerStyle}>Fecha</th>
            <th className={headerStyle}>Año</th>
            <th className={headerStyle}>Mes</th>
            <th className={headerStyle}>Día</th>
            <th className={headerStyle}>Personas</th>
            <th className={headerStyle}>Días</th>
          </tr>
        </thead>
        <tbody>
          {['apt1', 'apt2', 'apt3'].map((apt, index) => (
            <React.Fragment key={apt}>
              {/* Primera fila - FECHA 1 */}
              <tr>
                <td rowSpan="2" className={cellStyle} style={{ backgroundColor: colors.header, color: 'white', verticalAlign: 'middle' }}>
                  APT {index + 1}
                </td>
                <td className={cellStyle} style={{ backgroundColor: colors.header, color: 'white' }}>
                  FECHA 1
                </td>
                <td className={cellStyle}>
                  <input
                    type="number"
                    className={inputStyle}
                    value={dates[apt].startYear || ''}
                    onChange={(e) => handleDateChange(apt, 'startYear', e.target.value)}
                  />
                </td>
                <td className={cellStyle}>
                  <input
                    type="number"
                    className={inputStyle}
                    min="1"
                    max="12"
                    value={dates[apt].startMonth || ''}
                    onChange={(e) => handleDateChange(apt, 'startMonth', e.target.value)}
                  />
                </td>
                <td className={cellStyle}>
                  <input
                    type="number"
                    className={inputStyle}
                    min="1"
                    max="31"
                    value={dates[apt].startDay || ''}
                    onChange={(e) => handleDateChange(apt, 'startDay', e.target.value)}
                  />
                </td>
                <td className={cellStyle}>
                  <input
                    type="number"
                    className={inputStyle}
                    value={people[apt]}
                    onChange={(e) => setPeople({
                      ...people,
                      [apt]: parseInt(e.target.value) || 0
                    })}
                  />
                </td>
                <td className={cellStyle} style={{ backgroundColor: colors.lightBlue }}>
                  {results.days[apt]}
                </td>
              </tr>
              {/* Segunda fila - FECHA 2 */}
              <tr>
                <td className={cellStyle} style={{ backgroundColor: colors.header, color: 'white' }}>
                  FECHA 2
                </td>
                <td className={cellStyle}>
                  <input
                    type="number"
                    className={inputStyle}
                    value={dates[apt].endYear || ''}
                    onChange={(e) => handleDateChange(apt, 'endYear', e.target.value)}
                  />
                </td>
                <td className={cellStyle}>
                  <input
                    type="number"
                    className={inputStyle}
                    min="1"
                    max="12"
                    value={dates[apt].endMonth || ''}
                    onChange={(e) => handleDateChange(apt, 'endMonth', e.target.value)}
                  />
                </td>
                <td className={cellStyle}>
                  <input
                    type="number"
                    className={inputStyle}
                    min="1"
                    max="31"
                    value={dates[apt].endDay || ''}
                    onChange={(e) => handleDateChange(apt, 'endDay', e.target.value)}
                  />
                </td>
                <td className={cellStyle}></td>
                <td className={cellStyle}></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Tabla de valores */}
      <table className="w-full border-collapse border mb-8">
        <thead>
          <tr>
            <th className={headerStyle} style={{ backgroundColor: colors.header }}>CÁLCULO COSTO CONSUMO</th>
            <th className={headerStyle} style={{ backgroundColor: colors.header }}>Valor Agua</th>
            <th className={headerStyle}></th>
            <th className={headerStyle} style={{ backgroundColor: colors.header }}>Valor Aseo</th>
            <th className={headerStyle}></th>
            <th className={headerStyle} style={{ backgroundColor: colors.header }}>Valor Recibo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td className={cellStyle} style={{ backgroundColor: colors.calculation }}>
              <input
                type="text"
                className={inputStyle}
                value={bills.water.toLocaleString('es-CO', { 
                  style: 'currency', 
                  currency: 'COP',
                  minimumFractionDigits: 0 
                })}
                onChange={(e) => {
                  const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
                  setBills(prev => ({ ...prev, water: value }));
                }}
              />
            </td>
            <td></td>
            <td className={cellStyle}>
              <input
                type="text"
                className={inputStyle}
                value={bills.garbage.toLocaleString('es-CO', { 
                  style: 'currency', 
                  currency: 'COP',
                  minimumFractionDigits: 0 
                })}
                onChange={(e) => {
                  const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
                  setBills(prev => ({ ...prev, garbage: value }));
                }}
              />
            </td>
            <td></td>
            <td className={cellStyle}>
              {(bills.water + bills.garbage).toLocaleString('es-CO', { 
                style: 'currency', 
                currency: 'COP',
                minimumFractionDigits: 0 
              })}
            </td>
          </tr>
          <tr style={{ backgroundColor: colors.header }}>
            <td></td>
            <td className={headerStyle}>Agua</td>
            <td></td>
            <td className={headerStyle}>Aseo</td>
            <td></td>
            <td className={headerStyle}>Pagos</td>
          </tr>
          {Object.keys(results.costs).map((apt) => (
            <tr key={apt}>
              <td className={cellStyle} style={{ backgroundColor: colors.aptTitle, color: 'white' }}>
                {apt.toUpperCase()}
              </td>
              <td className={cellStyle} style={{ backgroundColor: colors.waterValue, color: 'white' }}>
                {results.costs[apt].water.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                })}
              </td>
              <td></td>
              <td className={cellStyle} style={{ backgroundColor: colors.garbageValue, color: 'white' }}>
                {results.costs[apt].garbage.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                })}
              </td>
              <td></td>
              <td className={cellStyle} style={{ backgroundColor: colors.totalValue, color: 'white' }}>
                {results.costs[apt].total.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de cálculos */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className={headerStyle} style={{ backgroundColor: colors.calculation }}>Min días</th>
            <th className={headerStyle} style={{ backgroundColor: colors.calculation }}>Person Apto</th>
            <th className={headerStyle} style={{ backgroundColor: colors.mediumDays }}>Media días</th>
            <th className={headerStyle} style={{ backgroundColor: colors.mediumDays }}>Person Apto</th>
            <th className={headerStyle} style={{ backgroundColor: colors.maxDays }}>Max días</th>
            <th className={headerStyle} style={{ backgroundColor: colors.maxDays }}>Person Apto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={cellStyle} style={{ backgroundColor: colors.calculation }}>33</td>
            <td className={cellStyle} style={{ backgroundColor: colors.calculation }}>4</td>
            <td className={cellStyle} style={{ backgroundColor: colors.mediumDays }}>0</td>
            <td className={cellStyle} style={{ backgroundColor: colors.mediumDays }}>0</td>
            <td className={cellStyle} style={{ backgroundColor: colors.maxDays }}>27</td>
            <td className={cellStyle} style={{ backgroundColor: colors.maxDays }}>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WaterCostCalculator;
