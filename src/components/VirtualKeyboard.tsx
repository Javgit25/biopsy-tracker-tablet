import React from 'react';
import { VirtualKeyboard as VirtualKeyboardType } from '../types';

interface VirtualKeyboardProps {
  keyboard: VirtualKeyboardType;
  onKeyPress: (key: string) => void;
  onConfirm: () => void;
  onSwitchType: (type: 'numeric' | 'full') => void;
  autoCompleteOptions?: string[];
  onSelectAutoComplete?: (option: string) => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  keyboard,
  onKeyPress,
  onConfirm,
  onSwitchType,
  autoCompleteOptions = [],
  onSelectAutoComplete
}) => {
  const handleSelectAutoComplete = (option: string) => {
    if (onSelectAutoComplete) {
      onSelectAutoComplete(option);
    }
    setTimeout(() => {
      onConfirm();
    }, 150);
  };

  if (keyboard.type === 'numeric') {
    const numericKeys = [
      ['1', '2', '3'],
      ['4', '5', '6'], 
      ['7', '8', '9'],
      ['0', '.', '-']
    ];

    return (
      <div className="virtual-keyboard slide-in">
        <div className="max-w-lg mx-auto">
          <div className="mb-4">
            <input
              type="text"
              value={keyboard.targetValue}
              readOnly
              className="w-full px-4 py-4 text-xl border-2 border-gray-300 rounded-lg bg-gray-50 text-center font-mono"
              placeholder="Ingrese número..."
            />
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {numericKeys.flat().map((key) => (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className="touch-button bg-blue-100 text-blue-800 hover:bg-blue-200 text-xl font-semibold h-16"
              >
                {key}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => onKeyPress('backspace')}
              className="touch-button bg-red-100 text-red-800 hover:bg-red-200"
            >
              ← Borrar
            </button>
            <button
              onClick={() => onKeyPress('clear')}
              className="touch-button bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              Limpiar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSwitchType('full')}
              className="touch-button bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            >
              ABC Teclado
            </button>
            <button
              onClick={onConfirm}
              className="touch-button bg-green-100 text-green-800 hover:bg-green-200"
            >
              ✓ Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Teclado completo
  const letterRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const numberRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-3">
          <input
            type="text"
            value={keyboard.targetValue}
            readOnly
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg bg-gray-50 font-mono"
            placeholder="Escriba aquí..."
          />
        </div>

        {/* 🔧 PANEL DE SUGERENCIAS MEJORADO CON CIERRE AUTOMÁTICO */}
        {keyboard.targetField === 'tissueType' && autoCompleteOptions.length > 0 && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-800">
                💡 {autoCompleteOptions.length} sugerencia{autoCompleteOptions.length !== 1 ? 's' : ''} encontrada{autoCompleteOptions.length !== 1 ? 's' : ''}
              </p>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Toque para seleccionar
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {autoCompleteOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAutoComplete(option)}
                  className="text-left p-3 bg-white hover:bg-blue-100 text-blue-800 rounded-lg border border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{option}</span>
                    <span className="text-xs text-blue-500">→</span>
                  </div>
                  {(option === 'PAP' || option === 'Citología') && (
                    <div className="text-xs text-blue-600 mt-1">
                      Requiere cantidad específica
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-blue-600 text-center">
              ✨ Se cerrará automáticamente al seleccionar
            </div>
          </div>
        )}

        <div className="grid grid-cols-10 gap-1 mb-2">
          {numberRow.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-2 rounded text-sm transition-colors"
            >
              {key}
            </button>
          ))}
        </div>

        {letterRows.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid gap-1 mb-2 ${
            rowIndex === 0 ? 'grid-cols-10' : 
            rowIndex === 1 ? 'grid-cols-9' : 'grid-cols-7'
          }`}>
            {row.map((key) => (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-3 px-2 rounded transition-colors"
              >
                {key}
              </button>
            ))}
          </div>
        ))}

        <div className="grid grid-cols-4 gap-2 mt-3">
          <button
            onClick={() => onKeyPress('space')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Espacio
          </button>
          <button
            onClick={() => onKeyPress('backspace')}
            className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            ← Borrar
          </button>
          <button
            onClick={() => onSwitchType('numeric')}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-3 px-4 rounded-lg transition-colors text-sm"
          >
            123 Números
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            ✓ Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};