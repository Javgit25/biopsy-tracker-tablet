import React, { useEffect, useState } from 'react';
import { Microscope, CheckCircle, ArrowRight, Hash, Delete, Check } from 'lucide-react';

interface Step1Props {
  biopsyNumber: string;
  todayBiopsiesCount: number;
  todayBiopsies: any[];
  onBiopsyNumberChange: (value: string) => void;
  onNext: () => void;
  onFinishDailyReport: () => void;
  onOpenVirtualKeyboard: (type: 'numeric' | 'full', field: string, currentValue?: string) => void;
}

export const Step1: React.FC<Step1Props> = ({
  biopsyNumber,
  todayBiopsiesCount,
  todayBiopsies,
  onBiopsyNumberChange,
  onNext,
  onFinishDailyReport,
  onOpenVirtualKeyboard
}) => {
  const [smartSuggestion, setSmartSuggestion] = useState<string>('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState<'numeric' | 'letters'>('numeric');

  // Colores del diseño
  const colors = {
    primaryBlue: '#4F76F6',
    darkBlue: '#3B5BDB',
    lightBlue: '#7C9BFF',
    yellow: '#FFE066',
    green: '#51CF66',
    white: '#FFFFFF',
    lightGray: '#F8FAFC',
    darkGray: '#64748B'
  };

  // Generar sugerencia inteligente basada en la última biopsia
  useEffect(() => {
    if (todayBiopsies.length > 0) {
      const lastBiopsy = todayBiopsies[todayBiopsies.length - 1];
      const lastNumber = lastBiopsy.number;
      
      const numberMatch = lastNumber.match(/(\d+)$/);
      if (numberMatch) {
        const baseNumber = parseInt(numberMatch[1]);
        const prefix = lastNumber.replace(/\d+$/, '');
        const nextNumber = baseNumber + 1;
        const suggestion = `${prefix}${String(nextNumber).padStart(numberMatch[1].length, '0')}`;
        setSmartSuggestion(suggestion);
      } else {
        setSmartSuggestion(`${lastNumber}1`);
      }
    } else {
      // Si no hay biopsias previas, generar sugerencia basada en fecha
      const today = new Date();
      const year = today.getFullYear().toString().slice(-2);
      const suggestion = `BX${year}-${String(todayBiopsiesCount + 1).padStart(3, '0')}`;
      setSmartSuggestion(suggestion);
    }
  }, [todayBiopsies, todayBiopsiesCount]);

  const handleKeyboardOpen = () => {
    setShowKeyboard(true);
  };

  // ✅ NUEVA FUNCIÓN: Aceptar y cerrar teclado
  const handleAcceptKeyboard = () => {
    setShowKeyboard(false);
  };

  const canProceed = biopsyNumber.trim() !== '';

  // Funciones del teclado
  const addToNumber = (char: string) => {
    onBiopsyNumberChange(biopsyNumber + char);
  };

  const deleteLastChar = () => {
    onBiopsyNumberChange(biopsyNumber.slice(0, -1));
  };

  const clearNumber = () => {
    onBiopsyNumberChange('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.lightGray,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      
      {/* Header Compacto con Logo y Título */}
      <div style={{
        backgroundColor: colors.white,
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        borderBottom: '1px solid #E2E8F0'
      }}>
        
        {/* Logo con número de paso */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: colors.primaryBlue,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(79, 118, 246, 0.3)'
          }}>
            <Microscope style={{ width: '30px', height: '30px', color: colors.white }} />
          </div>
          <div style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            width: '24px',
            height: '24px',
            backgroundColor: colors.green,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${colors.white}`,
            color: colors.white,
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            1
          </div>
        </div>

        {/* Título */}
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1F2937',
            margin: '0'
          }}>
            🔬 Identificación de Biopsia
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.darkGray,
            margin: '0'
          }}>
            Sistema profesional de registro anatomopatológico
          </p>
        </div>
      </div>

      {/* Dashboard Azul Compacto */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.darkBlue} 100%)`,
        margin: '20px',
        borderRadius: '20px',
        padding: '20px',
        color: colors.white,
        boxShadow: '0 8px 24px rgba(79, 118, 246, 0.3)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          textAlign: 'center',
          marginBottom: smartSuggestion ? '16px' : '0'
        }}>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
              {todayBiopsiesCount}
            </div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>BIOPSIAS HOY</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
              #{todayBiopsiesCount + 1}
            </div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>PRÓXIMA BIOPSIA</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
              {new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
            </div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>FECHA ACTUAL</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
              {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>HORA ACTUAL</div>
          </div>
        </div>
        
        {/* Sugerencia inteligente */}
        {smartSuggestion && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              <span>💡</span>
              <span>Sugerencia inteligente:</span>
              <span style={{ 
                color: colors.yellow, 
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                {smartSuggestion}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Contenido Principal - Campo de entrada COMPACTO */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 20px'
      }}>
        
        <div style={{
          backgroundColor: colors.white,
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          textAlign: 'center'
        }}>
          
          {/* Título del campo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <Hash style={{ width: '24px', height: '24px', color: colors.primaryBlue }} />
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1F2937',
              margin: '0'
            }}>
              Número de Identificación
            </h2>
          </div>

          {/* Campo de entrada principal */}
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={handleKeyboardOpen}
              style={{
                width: '100%',
                padding: '20px',
                fontSize: '28px',
                border: `3px solid ${biopsyNumber ? colors.primaryBlue : '#E2E8F0'}`,
                borderRadius: '16px',
                backgroundColor: colors.white,
                fontWeight: 'bold',
                color: biopsyNumber ? colors.primaryBlue : '#9CA3AF',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: biopsyNumber ? `0 0 0 3px rgba(79, 118, 246, 0.1)` : 'none',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = colors.primaryBlue;
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 118, 246, 0.15)';
              }}
              onMouseOut={(e) => {
                if (!biopsyNumber) {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {biopsyNumber || 'Toque para abrir teclado...'}
            </button>
          </div>

          {/* Botón de sugerencia */}
          {smartSuggestion && !biopsyNumber && (
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={() => onBiopsyNumberChange(smartSuggestion)}
                style={{
                  padding: '16px 32px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: colors.primaryBlue,
                  backgroundColor: '#F0F4FF',
                  border: `2px solid ${colors.lightBlue}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#E0EBFF';
                  e.currentTarget.style.borderColor = colors.primaryBlue;
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#F0F4FF';
                  e.currentTarget.style.borderColor = colors.lightBlue;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ✨ Usar: {smartSuggestion}
              </button>
            </div>
          )}

          {/* Confirmación */}
          {biopsyNumber && (
            <div style={{
              background: '#F0FDF4',
              border: `2px solid ${colors.green}`,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px' 
              }}>
                <CheckCircle style={{ width: '24px', height: '24px', color: colors.green }} />
                <span style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#065F46' 
                }}>
                  ✅ Número #{biopsyNumber} confirmado
                </span>
              </div>
            </div>
          )}

          {/* Botón principal */}
          <button
            onClick={onNext}
            disabled={!canProceed}
            style={{
              width: '100%',
              fontWeight: 'bold',
              padding: '18px',
              borderRadius: '16px',
              fontSize: '20px',
              border: 'none',
              cursor: canProceed ? 'pointer' : 'not-allowed',
              background: canProceed 
                ? `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.darkBlue} 100%)` 
                : '#CBD5E1',
              color: colors.white,
              boxShadow: canProceed ? '0 4px 16px rgba(79, 118, 246, 0.3)' : 'none',
              transition: 'all 0.3s ease',
              opacity: canProceed ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (canProceed) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 118, 246, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (canProceed) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(79, 118, 246, 0.3)';
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}>
              <span>Continuar al Tipo de Tejido</span>
              <ArrowRight style={{ width: '24px', height: '24px' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Teclado Virtual Profesional con botón ACEPTAR */}
      {showKeyboard && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '580px',
          maxWidth: '85vw',
          backgroundColor: colors.white,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(79, 118, 246, 0.1)',
          border: `1px solid ${colors.lightBlue}`,
          zIndex: 1000
        }}>
          
          {/* Header Profesional */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid #E5E7EB'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: colors.primaryBlue,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: colors.white, fontSize: '16px' }}>⌨️</span>
              </div>
              <h3 style={{
                margin: '0',
                color: '#1F2937',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                Teclado Virtual
              </h3>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {/* Indicador de entrada actual */}
              <div style={{
                padding: '6px 12px',
                backgroundColor: colors.primaryBlue,
                color: colors.white,
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {biopsyNumber || 'Vacío'}
              </div>
              
              <button
                onClick={() => setShowKeyboard(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#E5E7EB';
                  e.currentTarget.style.color = '#374151';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                  e.currentTarget.style.color = '#6B7280';
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Pestañas Elegantes */}
          <div style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '20px',
            backgroundColor: '#F8FAFC',
            padding: '4px',
            borderRadius: '12px'
          }}>
            <button
              onClick={() => setKeyboardMode('numeric')}
              style={{
                flex: '1',
                padding: '12px 20px',
                backgroundColor: keyboardMode === 'numeric' ? colors.primaryBlue : 'transparent',
                color: keyboardMode === 'numeric' ? colors.white : '#64748B',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: keyboardMode === 'numeric' ? '0 2px 8px rgba(79, 118, 246, 0.2)' : 'none'
              }}
            >
              🔢 Numérico
            </button>
            <button
              onClick={() => setKeyboardMode('letters')}
              style={{
                flex: '1',
                padding: '12px 20px',
                backgroundColor: keyboardMode === 'letters' ? colors.primaryBlue : 'transparent',
                color: keyboardMode === 'letters' ? colors.white : '#64748B',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: keyboardMode === 'letters' ? '0 2px 8px rgba(79, 118, 246, 0.2)' : 'none'
              }}
            >
              🔤 Alfabético
            </button>
          </div>

          {/* Teclado Numérico Profesional */}
          {keyboardMode === 'numeric' && (
            <div>
              {/* Grid principal de números */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '16px'
              }}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                  <button
                    key={num}
                    onClick={() => addToNumber(num)}
                    style={{
                      padding: '18px',
                      fontSize: '20px',
                      fontWeight: '600',
                      backgroundColor: colors.white,
                      color: '#1F2937',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primaryBlue;
                      e.currentTarget.style.color = colors.white;
                      e.currentTarget.style.borderColor = colors.primaryBlue;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 118, 246, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = colors.white;
                      e.currentTarget.style.color = '#1F2937';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
              
              {/* Fila inferior con 0 y símbolos */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <button
                  onClick={() => addToNumber('-')}
                  style={{
                    padding: '18px',
                    fontSize: '24px',
                    fontWeight: '600',
                    backgroundColor: colors.primaryBlue,
                    color: colors.white,
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(79, 118, 246, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.darkBlue;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(79, 118, 246, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryBlue;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(79, 118, 246, 0.2)';
                  }}
                >
                  −
                </button>
                
                <button
                  onClick={() => addToNumber('0')}
                  style={{
                    padding: '18px',
                    fontSize: '20px',
                    fontWeight: '600',
                    backgroundColor: colors.white,
                    color: '#1F2937',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryBlue;
                    e.currentTarget.style.color = colors.white;
                    e.currentTarget.style.borderColor = colors.primaryBlue;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 118, 246, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.white;
                    e.currentTarget.style.color = '#1F2937';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  0
                </button>
                
                <button
                  onClick={() => addToNumber('/')}
                  style={{
                    padding: '18px',
                    fontSize: '24px',
                    fontWeight: '600',
                    backgroundColor: colors.primaryBlue,
                    color: colors.white,
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(79, 118, 246, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colors.darkBlue;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(79, 118, 246, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primaryBlue;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(79, 118, 246, 0.2)';
                  }}
                >
                  ∕
                </button>
              </div>
              
              {/* Controles profesionales */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 2fr',
                gap: '12px'
              }}>
                <button
                  onClick={deleteLastChar}
                  style={{
                    padding: '16px',
                    fontSize: '15px',
                    fontWeight: '500',
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    border: '1px solid #FECACA',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#DC2626';
                    e.currentTarget.style.color = colors.white;
                    e.currentTarget.style.borderColor = '#DC2626';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#FEF2F2';
                    e.currentTarget.style.color = '#DC2626';
                    e.currentTarget.style.borderColor = '#FECACA';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Delete style={{ width: '16px', height: '16px' }} />
                  Borrar
                </button>
                
                <button
                  onClick={clearNumber}
                  style={{
                    padding: '16px',
                    fontSize: '15px',
                    fontWeight: '500',
                    backgroundColor: '#FFFBEB',
                    color: '#D97706',
                    border: '1px solid #FDE68A',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#D97706';
                    e.currentTarget.style.color = colors.white;
                    e.currentTarget.style.borderColor = '#D97706';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFBEB';
                    e.currentTarget.style.color = '#D97706';
                    e.currentTarget.style.borderColor = '#FDE68A';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Limpiar
                </button>
                
                {/* ✅ NUEVO BOTÓN ACEPTAR PROMINENTE */}
                <button
                  onClick={handleAcceptKeyboard}
                  style={{
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    backgroundColor: colors.green,
                    color: colors.white,
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(81, 207, 102, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#16A34A';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(81, 207, 102, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.green;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(81, 207, 102, 0.3)';
                  }}
                >
                  <Check style={{ width: '18px', height: '18px' }} />
                  ACEPTAR
                </button>
              </div>
            </div>
          )}

          {/* Teclado Alfabético Profesional */}
          {keyboardMode === 'letters' && (
            <div>
              {/* Fila 1: A-I */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                gap: '8px',
                marginBottom: '10px'
              }}>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(letter => (
                  <button
                    key={letter}
                    onClick={() => addToNumber(letter)}
                    style={{
                      padding: '14px 8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      backgroundColor: colors.white,
                      color: '#1F2937',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primaryBlue;
                      e.currentTarget.style.color = colors.white;
                      e.currentTarget.style.borderColor = colors.primaryBlue;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = colors.white;
                      e.currentTarget.style.color = '#1F2937';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              
              {/* Fila 2: J-R */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                gap: '8px',
                marginBottom: '10px'
              }}>
                {['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'].map(letter => (
                  <button
                    key={letter}
                    onClick={() => addToNumber(letter)}
                    style={{
                      padding: '14px 8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      backgroundColor: colors.white,
                      color: '#1F2937',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primaryBlue;
                      e.currentTarget.style.color = colors.white;
                      e.currentTarget.style.borderColor = colors.primaryBlue;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = colors.white;
                      e.currentTarget.style.color = '#1F2937';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              
              {/* Fila 3: S-Z */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                gap: '8px',
                marginBottom: '12px'
              }}>
                {['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => (
                  <button
                    key={letter}
                    onClick={() => addToNumber(letter)}
                    style={{
                      padding: '14px 8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      backgroundColor: colors.white,
                      color: '#1F2937',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primaryBlue;
                      e.currentTarget.style.color = colors.white;
                      e.currentTarget.style.borderColor = colors.primaryBlue;
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = colors.white;
                      e.currentTarget.style.color = '#1F2937';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
              
              {/* Símbolos y controles */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 2fr',
                gap: '8px'
              }}>
                {['.', '_', ':', ';'].map(symbol => (
                  <button
                    key={symbol}
                    onClick={() => addToNumber(symbol)}
                    style={{
                      padding: '14px 8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      backgroundColor: '#F8FAFC',
                      color: '#475569',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primaryBlue;
                      e.currentTarget.style.color = colors.white;
                      e.currentTarget.style.borderColor = colors.primaryBlue;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.borderColor = '#CBD5E1';
                    }}
                  >
                    {symbol}
                  </button>
                ))}
                
                <button
                  onClick={deleteLastChar}
                  style={{
                    padding: '14px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    border: '1px solid #FECACA',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#DC2626';
                    e.currentTarget.style.color = colors.white;
                    e.currentTarget.style.borderColor = '#DC2626';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#FEF2F2';
                    e.currentTarget.style.color = '#DC2626';
                    e.currentTarget.style.borderColor = '#FECACA';
                  }}
                >
                  <Delete style={{ width: '14px', height: '14px' }} />
                  DEL
                </button>
                
                {/* ✅ NUEVO BOTÓN ACEPTAR PARA MODO ALFABÉTICO */}
                <button
                  onClick={handleAcceptKeyboard}
                  style={{
                    padding: '14px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: colors.green,
                    color: colors.white,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(81, 207, 102, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#16A34A';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(81, 207, 102, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colors.green;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(81, 207, 102, 0.3)';
                  }}
                >
                  <Check style={{ width: '14px', height: '14px' }} />
                  ACEPTAR
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};