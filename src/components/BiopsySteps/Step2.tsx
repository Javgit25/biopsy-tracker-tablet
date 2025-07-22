import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Search, Stethoscope, Microscope, Eye, Heart, Brain, Star, Check, X, ChevronDown, ChevronUp, Plus, Minus, Clock, AlertCircle } from 'lucide-react';
import { tissueTypes } from '../../constants/services';

interface Step2Props {
  tissueType: string;
  endoscopiaSubTypes: string[];
  frequentTissues: string[];
  papQuantity?: number;
  papUrgente?: boolean;
  citologiaQuantity?: number;
  citologiaUrgente?: boolean;
  onTissueTypeChange: (value: string) => void;
  onEndoscopiaSubTypesChange: (subTypes: string[]) => void;
  onPapQuantityChange?: (quantity: number) => void;
  onPapUrgenteChange?: (urgente: boolean) => void;
  onCitologiaQuantityChange?: (quantity: number) => void;
  onCitologiaUrgenteChange?: (urgente: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  onUpdateFrequentTissues: (tissue: string) => void;
  onOpenVirtualKeyboard: (type: 'numeric' | 'full', field: string, currentValue: string) => void;
  onCloseVirtualKeyboard: () => void;
  autoCompleteOptions: string[];
  onSelectAutoComplete: (suggestion: string) => void;
  keyboardValue: string;
}

export const Step2: React.FC<Step2Props> = ({
  tissueType,
  endoscopiaSubTypes,
  frequentTissues,
  papQuantity = 0,
  papUrgente = false,
  citologiaQuantity = 0,
  citologiaUrgente = false,
  onTissueTypeChange,
  onEndoscopiaSubTypesChange,
  onPapQuantityChange,
  onPapUrgenteChange,
  onCitologiaQuantityChange,
  onCitologiaUrgenteChange,
  onNext,
  onPrev,
  onUpdateFrequentTissues,
  onOpenVirtualKeyboard,
  onCloseVirtualKeyboard,
  autoCompleteOptions,
  onSelectAutoComplete,
  keyboardValue
}) => {
  const [showEndoscopiaMenu, setShowEndoscopiaMenu] = useState(false);

  const colors = {
    primaryBlue: '#4F76F6',
    darkBlue: '#3B5BDB',
    lightBlue: '#7C9BFF',
    green: '#51CF66',
    white: '#FFFFFF',
    lightGray: '#F8FAFC',
    darkGray: '#64748B',
    orange: '#FF8C42',
    red: '#EF4444'
  };

  const currentStep = 2;
  const totalSteps = 7;

  const endoscopiaCategories = {
    'Digestivo': [
      { value: 'Esófago', icon: '🔴' },
      { value: 'Estómago', icon: '🟠' },
      { value: 'Duodeno', icon: '🟡' },
      { value: 'Íleon', icon: '🟢' },
      { value: 'Colon', icon: '🔵' },
      { value: 'Recto', icon: '🟣' }
    ],
    'Respiratorio': [
      { value: 'Bronquio', icon: '🫁' },
      { value: 'Laringe', icon: '🗣️' }
    ],
    'Ginecológico': [
      { value: 'Cuello uterino', icon: '🌸' },
      { value: 'Vagina', icon: '🌺' },
      { value: 'Vulva', icon: '🌷' }
    ]
  };

  const organizedTissues = {
    'Más Frecuentes': frequentTissues.length > 0 ? frequentTissues.slice(0, 6) : ['Gastrica', 'Endometrio', 'Endoscopia', 'Piel', 'PAP', 'Citología']
  };

  const handleEndoscopiaSubTypeToggle = (subType: string) => {
    const currentSubTypes = endoscopiaSubTypes || [];
    if (currentSubTypes.includes(subType)) {
      onEndoscopiaSubTypesChange(currentSubTypes.filter(type => type !== subType));
    } else {
      onEndoscopiaSubTypesChange([...currentSubTypes, subType]);
    }
  };

  const handleTissueSelect = (tissue: string) => {
    console.log('🔍 Seleccionando tejido:', tissue);
    
    // Actualizamos el tejido
    onTissueTypeChange(tissue);
    onUpdateFrequentTissues(tissue);
    
    // Intentamos cerrar el teclado - múltiples métodos
    console.log('🔐 Intentando cerrar teclado...');
    
    // Método 1: Función prop
    onCloseVirtualKeyboard();
    
    // Método 2: Blur del input activo
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
    
    // Método 3: Buscar y ocultar el teclado virtual directamente
    setTimeout(() => {
      const keyboard = document.querySelector('[data-virtual-keyboard]') as HTMLElement;
      const keyboardModal = document.querySelector('[class*="keyboard"]') as HTMLElement;
      const overlay = document.querySelector('[class*="overlay"]') as HTMLElement;
      
      if (keyboard) {
        keyboard.style.display = 'none';
        console.log('🎹 Teclado ocultado directamente');
      }
      if (keyboardModal) {
        keyboardModal.style.display = 'none';
        console.log('🎹 Modal de teclado ocultado');
      }
      if (overlay) {
        overlay.style.display = 'none';
        console.log('🎹 Overlay ocultado');
      }
      
      // Llamada adicional a la función
      onCloseVirtualKeyboard();
    }, 50);
    
    // Limpiamos autocompletado
    onSelectAutoComplete('');
    
    if (tissue === 'Endoscopia') {
      setShowEndoscopiaMenu(true);
    } else {
      setShowEndoscopiaMenu(false);
      onEndoscopiaSubTypesChange([]);
    }

    // Reset valores cuando cambia el tipo de tejido
    if (tissue !== 'PAP' && onPapQuantityChange && onPapUrgenteChange) {
      onPapQuantityChange(0);
      onPapUrgenteChange(false);
    }
    if (tissue !== 'Citología' && onCitologiaQuantityChange && onCitologiaUrgenteChange) {
      onCitologiaQuantityChange(0);
      onCitologiaUrgenteChange(false);
    }
    
    console.log('✅ Tejido seleccionado y teclado cerrado');
  };

  const handlePapQuantityChange = (newQuantity: number) => {
    if (onPapQuantityChange && newQuantity >= 0) {
      onPapQuantityChange(newQuantity);
    }
  };

  const handlePapUrgenteToggle = () => {
    if (onPapUrgenteChange) {
      onPapUrgenteChange(!papUrgente);
    }
  };

  const handleCitologiaQuantityChange = (newQuantity: number) => {
    if (onCitologiaQuantityChange && newQuantity >= 0) {
      onCitologiaQuantityChange(newQuantity);
    }
  };

  const handleCitologiaUrgenteToggle = () => {
    if (onCitologiaUrgenteChange) {
      onCitologiaUrgenteChange(!citologiaUrgente);
    }
  };

  useEffect(() => {
    if (tissueType === 'Endoscopia') {
      setShowEndoscopiaMenu(true);
    }
  }, [tissueType]);

  const isPAPSelected = tissueType === 'PAP';
  const isCitologiaSelected = tissueType === 'Citología';
  const isEndoscopiaSelected = tissueType === 'Endoscopia';

  const QuantitySelector = ({ 
    label, 
    value, 
    onChange, 
    description
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    description: string;
  }) => (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '20px'
    }}>
      <h5 style={{
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '12px',
        color: colors.white
      }}>
        {label}
      </h5>
      <p style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px',
        marginBottom: '16px'
      }}>
        {description}
      </p>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: value > 0 ? 'pointer' : 'not-allowed',
            opacity: value <= 0 ? 0.5 : 1
          }}
        >
          <Minus style={{ width: '24px', height: '24px', color: colors.white }} />
        </button>
        
        <div style={{
          flex: '1',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: colors.white,
            marginBottom: '4px'
          }}>
            {value}
          </div>
          <div style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '14px'
          }}>
            {value === 0 ? 'No especificado' : 
             value === 1 ? '1 unidad' : 
             `${value} unidades`}
          </div>
        </div>
        
        <button
          onClick={() => onChange(value + 1)}
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Plus style={{ width: '24px', height: '24px', color: colors.white }} />
        </button>
      </div>
      
      <div style={{ marginTop: '16px' }}>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            color: colors.white,
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600'
          }}
          placeholder="0"
          min="0"
          max="999"
        />
      </div>
    </div>
  );

  const UrgentToggle = ({ 
    isUrgent, 
    onToggle, 
    label 
  }: {
    isUrgent: boolean;
    onToggle: () => void;
    label: string;
  }) => (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '16px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <Clock style={{ width: '24px', height: '24px', color: colors.orange }} />
            <h5 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: colors.white,
              margin: 0
            }}>
              {label}
            </h5>
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '14px',
            margin: 0
          }}>
            Procesamiento prioritario en 24 horas
          </p>
        </div>
        
        <button
          onClick={onToggle}
          style={{
            width: '60px',
            height: '32px',
            backgroundColor: isUrgent ? colors.orange : 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '16px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: colors.white,
            borderRadius: '50%',
            position: 'absolute',
            top: '4px',
            left: isUrgent ? '32px' : '4px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {isUrgent && <AlertCircle style={{ width: '12px', height: '12px', color: colors.orange }} />}
          </div>
        </button>
      </div>
      
      {isUrgent && (
        <div style={{
          marginTop: '16px',
          backgroundColor: 'rgba(255, 140, 66, 0.2)',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid rgba(255, 140, 66, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle style={{ width: '16px', height: '16px', color: colors.orange }} />
            <p style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontWeight: '600',
              margin: 0,
              fontSize: '14px'
            }}>
              ⚡ Servicio Urgente 24hs - Costo adicional aplicado
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: colors.lightGray,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      
      {/* Barra de Progreso */}
      <div style={{
        padding: '12px 24px',
        backgroundColor: colors.white,
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#E2E8F0',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(currentStep / totalSteps) * 100}%`,
            height: '100%',
            background: colors.primaryBlue,
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
          fontSize: '12px'
        }}>
          {['Número', 'Tejido', 'Tipo', 'Cassettes', 'Trozos', 'Servicios', 'Confirmar'].map((step, index) => (
            <span 
              key={step}
              style={{
                color: index < currentStep ? colors.primaryBlue : index === currentStep - 1 ? '#1F2937' : colors.darkGray,
                fontWeight: index === currentStep - 1 ? '600' : '500'
              }}
            >
              {step}
            </span>
          ))}
        </div>
      </div>
      
      {/* Header */}
      <div style={{
        backgroundColor: colors.white,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: colors.primaryBlue,
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(79, 118, 246, 0.3)'
          }}>
            <Microscope style={{ width: '26px', height: '26px', color: colors.white }} />
          </div>
          <div style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '20px',
            height: '20px',
            backgroundColor: colors.green,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${colors.white}`,
            color: colors.white,
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            2
          </div>
        </div>
        <div>
          <h1 style={{
            fontSize: '26px',
            fontWeight: 'bold',
            color: '#1F2937',
            margin: '0',
            lineHeight: '1.2'
          }}>
            🔬 Tipo de Tejido
          </h1>
          <p style={{
            fontSize: '14px',
            color: colors.darkGray,
            margin: '0',
            lineHeight: '1.3'
          }}>
            Seleccione el tipo de tejido para análisis
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div style={{
        flex: '1',
        overflowY: 'auto',
        padding: '15px'
      }}>
        <div style={{
          backgroundColor: colors.white,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%'
        }}>

          {/* Campo de búsqueda - CORREGIDO */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px'
            }}>
              Buscar o escribir tipo de tejido
            </label>
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => onOpenVirtualKeyboard('full', 'tissueType', tissueType)}
                style={{
                  width: '100%',
                  padding: '16px 60px 16px 20px',
                  fontSize: '18px',
                  border: `2px solid ${tissueType ? colors.primaryBlue : '#E5E7EB'}`,
                  borderRadius: '12px',
                  backgroundColor: colors.white,
                  color: tissueType ? colors.primaryBlue : '#9CA3AF',
                  boxShadow: tissueType ? `0 0 0 3px rgba(79, 118, 246, 0.1)` : 'none',
                  cursor: 'pointer',
                  minHeight: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                {keyboardValue || tissueType || (
                  <span style={{ color: '#9CA3AF' }}>
                    Ej: Gastrica, PAP, Endoscopia...
                  </span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVirtualKeyboard('full', 'tissueType', tissueType);
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: colors.primaryBlue,
                  color: colors.white,
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <Search style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            
            {/* AutoComplete mejorado */}
            {autoCompleteOptions.length > 0 && (
              <div style={{
                marginTop: '8px',
                backgroundColor: colors.white,
                border: '2px solid #EBF4FF',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 9999
              }}>
                <div style={{
                  padding: '8px 16px',
                  backgroundColor: '#EBF4FF',
                  borderBottom: '1px solid #E5E7EB',
                  fontSize: '12px',
                  color: colors.primaryBlue,
                  fontWeight: '600'
                }}>
                  💡 {autoCompleteOptions.length} sugerencia{autoCompleteOptions.length !== 1 ? 's' : ''} encontrada{autoCompleteOptions.length !== 1 ? 's' : ''}
                </div>
                {autoCompleteOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      console.log('🖱️ Click en autocompletado:', option);
                      handleTissueSelect(option);
                      
                      setTimeout(() => {
                        const keyboardElements = document.querySelectorAll('[class*="keyboard"], [class*="modal"], [data-virtual-keyboard]');
                        keyboardElements.forEach(el => {
                          (el as HTMLElement).style.display = 'none';
                        });
                        (document.activeElement as HTMLElement)?.blur();
                        console.log('🔐 Métodos de cierre aplicados desde autocompletado');
                      }, 100);
                    }}
                    style={{
                      width: '100%',
                      padding: '16px',
                      textAlign: 'left',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: index < autoCompleteOptions.length - 1 ? '1px solid #F3F4F6' : 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#374151',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F0F9FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: colors.primaryBlue,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Search style={{ width: '16px', height: '16px', color: colors.white }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: '600',
                          marginBottom: '2px'
                        }}>
                          {option}
                        </div>
                        {(option === 'PAP' || option === 'Citología') && (
                          <div style={{
                            fontSize: '12px',
                            color: '#6B7280'
                          }}>
                            Requiere cantidad específica
                          </div>
                        )}
                      </div>
                      {(option === 'PAP' || option === 'Citología') && (
                        <span style={{
                          backgroundColor: '#FEF3C7',
                          color: '#D97706',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          ESPECIAL
                        </span>
                      )}
                      <div style={{
                        fontSize: '12px',
                        color: colors.primaryBlue,
                        fontWeight: '500'
                      }}>
                        Toque para seleccionar →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tipos de tejido */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1F2937',
              margin: '0 0 16px 0'
            }}>
              Tipos de Tejido más Comunes
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              {Object.entries(organizedTissues).map(([category, tissues]) => (
                <React.Fragment key={category}>
                  <div style={{
                    gridColumn: '1 / -1',
                    marginBottom: '8px'
                  }}>
                    <h5 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Star style={{ width: '18px', height: '18px', color: '#F59E0B', marginRight: '8px' }} />
                      {category}
                    </h5>
                  </div>
                  {tissues.map((tissue, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleTissueSelect(tissue);
                      }}
                      style={{
                        padding: '16px',
                        borderRadius: '10px',
                        border: `2px solid ${tissueType === tissue ? colors.primaryBlue : '#E5E7EB'}`,
                        backgroundColor: tissueType === tissue ? '#EBF4FF' : colors.white,
                        color: tissueType === tissue ? colors.primaryBlue : '#374151',
                        textAlign: 'center',
                        fontWeight: tissueType === tissue ? '600' : '500',
                        cursor: 'pointer',
                        transform: tissueType === tissue ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: tissueType === tissue ? `0 0 0 3px rgba(79, 118, 246, 0.1)` : 'none',
                        minHeight: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span style={{ fontSize: '16px', marginBottom: '4px' }}>{tissue}</span>
                      {tissueType === tissue && (
                        <Check style={{ width: '18px', height: '18px', marginTop: '4px' }} />
                      )}
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Panel PAP */}
          {isPAPSelected && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                color: colors.white,
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(236, 72, 153, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <Eye style={{ width: '32px', height: '32px' }} />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      margin: '0 0 4px 0'
                    }}>
                      PAP - Papanicolaou
                    </h4>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '16px',
                      margin: '0'
                    }}>
                      Citología cervical para detección temprana
                    </p>
                  </div>
                </div>
                
                <QuantitySelector
                  label="Cantidad de PAP"
                  value={papQuantity}
                  onChange={handlePapQuantityChange}
                  description="Cada vidrio de PAP se cobra por separado."
                />

                <UrgentToggle
                  isUrgent={papUrgente}
                  onToggle={handlePapUrgenteToggle}
                  label="PAP Urgente 24hs"
                />

                {papQuantity > 0 && (
                  <div style={{
                    marginTop: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <h5 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '12px'
                    }}>
                      💰 Información de Facturación
                    </h5>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}>
                          {papQuantity}
                        </div>
                        <div style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: '14px'
                        }}>
                          Vidrios PAP
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}>
                          {papQuantity}
                        </div>
                        <div style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: '14px'
                        }}>
                          Servicios facturados
                        </div>
                      </div>
                      {papUrgente && (
                        <div style={{
                          backgroundColor: 'rgba(255, 140, 66, 0.3)',
                          borderRadius: '8px',
                          padding: '16px'
                        }}>
                          <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold'
                          }}>
                            ⚡
                          </div>
                          <div style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '14px'
                          }}>
                            Urgente 24hs
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Panel Citología */}
          {isCitologiaSelected && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
                color: colors.white,
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(20, 184, 166, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <Microscope style={{ width: '32px', height: '32px' }} />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      margin: '0 0 4px 0'
                    }}>
                      Citología
                    </h4>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '16px',
                      margin: '0'
                    }}>
                      Análisis citológico especializado
                    </p>
                  </div>
                </div>
                
                <QuantitySelector
                  label="Cantidad de Vidrios"
                  value={citologiaQuantity}
                  onChange={handleCitologiaQuantityChange}
                  description="Se cobra UN SOLO servicio por paciente."
                />

                <UrgentToggle
                  isUrgent={citologiaUrgente}
                  onToggle={handleCitologiaUrgenteToggle}
                  label="Citología Urgente 24hs"
                />

                {citologiaQuantity > 0 && (
                  <div style={{
                    marginTop: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <h5 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '12px'
                    }}>
                      💰 Información de Facturación
                    </h5>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}>
                          {citologiaQuantity}
                        </div>
                        <div style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: '14px'
                        }}>
                          Vidrios a procesar
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '16px'
                      }}>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: 'bold'
                        }}>
                          1
                        </div>
                        <div style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: '14px'
                        }}>
                          Servicio facturado
                        </div>
                      </div>
                      {citologiaUrgente && (
                        <div style={{
                          backgroundColor: 'rgba(255, 140, 66, 0.3)',
                          borderRadius: '8px',
                          padding: '16px'
                        }}>
                          <div style={{
                            fontSize: '24px',
                            fontWeight: 'bold'
                          }}>
                            ⚡
                          </div>
                          <div style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '14px'
                          }}>
                            Urgente 24hs
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{
                      marginTop: '16px',
                      backgroundColor: 'rgba(34, 197, 94, 0.2)',
                      borderRadius: '8px',
                      padding: '16px',
                      border: '1px solid rgba(34, 197, 94, 0.3)'
                    }}>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontWeight: '500',
                        textAlign: 'center',
                        margin: '0',
                        fontSize: '14px'
                      }}>
                        💡 Se factura como 1 servicio por paciente
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Panel Endoscopia */}
          {isEndoscopiaSelected && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #4F76F6 0%, #06B6D4 100%)',
                color: colors.white,
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(79, 118, 246, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px'
                    }}>
                      <Microscope style={{ width: '32px', height: '32px' }} />
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        margin: '0 0 4px 0'
                      }}>
                        Endoscopia - Múltiples Sitios
                      </h4>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '16px',
                        margin: '0'
                      }}>
                        Seleccione todos los sitios donde se tomaron muestras
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEndoscopiaMenu(!showEndoscopiaMenu)}
                    style={{
                      padding: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      color: colors.white,
                      cursor: 'pointer'
                    }}
                  >
                    {showEndoscopiaMenu ? <ChevronUp style={{ width: '24px', height: '24px' }} /> : <ChevronDown style={{ width: '24px', height: '24px' }} />}
                  </button>
                </div>

                {showEndoscopiaMenu && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {Object.entries(endoscopiaCategories).map(([category, options]) => (
                      <div key={category}>
                        <h5 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '16px',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {category === 'Digestivo' && <Heart style={{ width: '20px', height: '20px', marginRight: '8px' }} />}
                          {category === 'Respiratorio' && <Heart style={{ width: '20px', height: '20px', marginRight: '8px' }} />}
                          {category === 'Ginecológico' && <Eye style={{ width: '20px', height: '20px', marginRight: '8px' }} />}
                          Sistema {category}
                        </h5>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '12px'
                        }}>
                          {options.map((option) => {
                            const isSelected = endoscopiaSubTypes?.includes(option.value);
                            return (
                              <button
                                key={option.value}
                                onClick={() => handleEndoscopiaSubTypeToggle(option.value)}
                                style={{
                                  padding: '16px',
                                  borderRadius: '12px',
                                  border: `2px solid ${isSelected ? colors.white : 'rgba(255, 255, 255, 0.3)'}`,
                                  backgroundColor: isSelected ? colors.white : 'rgba(255, 255, 255, 0.1)',
                                  color: isSelected ? colors.primaryBlue : colors.white,
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                  boxShadow: isSelected ? '0 4px 16px rgba(255, 255, 255, 0.2)' : 'none',
                                  minHeight: '80px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  gap: '8px',
                                  textAlign: 'center'
                                }}>
                                  <span style={{ fontSize: '24px' }}>{option.icon}</span>
                                  <div style={{
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    lineHeight: '1.2'
                                  }}>
                                    {option.value}
                                  </div>
                                  {isSelected && (
                                    <div style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      fontSize: '11px',
                                      marginTop: '2px'
                                    }}>
                                      <Check style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                                      Seleccionado
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {endoscopiaSubTypes && endoscopiaSubTypes.length > 0 && (
                      <div style={{
                        marginTop: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '20px'
                      }}>
                        <h5 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '16px'
                        }}>
                          ✅ Sitios Seleccionados ({endoscopiaSubTypes.length})
                        </h5>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}>
                          {endoscopiaSubTypes.map((subType, index) => (
                            <div
                              key={index}
                              style={{
                                backgroundColor: colors.white,
                                color: colors.primaryBlue,
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px'
                              }}
                            >
                              <span>{subType}</span>
                              <button
                                onClick={() => handleEndoscopiaSubTypeToggle(subType)}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  color: '#EF4444',
                                  cursor: 'pointer',
                                  padding: '4px',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <X style={{ width: '14px', height: '14px' }} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div style={{
                          marginTop: '16px',
                          padding: '16px',
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          borderRadius: '8px',
                          border: '1px solid rgba(34, 197, 94, 0.3)'
                        }}>
                          <p style={{
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontWeight: '500',
                            margin: '0',
                            fontSize: '14px'
                          }}>
                            💡 Se crearán cassettes separados para cada sitio seleccionado
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Resumen de selección */}
          {tissueType && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                backgroundColor: '#F0FDF4',
                border: `2px solid ${colors.green}`,
                borderRadius: '12px',
                padding: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: colors.green,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check style={{ width: '24px', height: '24px', color: colors.white }} />
                  </div>
                  <div>
                    <h5 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#065F46',
                      margin: '0 0 4px 0'
                    }}>
                      Tejido Seleccionado
                    </h5>
                    <p style={{
                      fontSize: '16px',
                      color: '#047857',
                      margin: '0'
                    }}>
                      {tissueType}
                      {isPAPSelected && papQuantity > 0 && (
                        <span style={{
                          marginLeft: '8px',
                          color: '#059669'
                        }}>
                          ({papQuantity} PAP{papQuantity !== 1 ? 's' : ''}{papUrgente ? ' - Urgente 24hs' : ''})
                        </span>
                      )}
                      {isCitologiaSelected && citologiaQuantity > 0 && (
                        <span style={{
                          marginLeft: '8px',
                          color: '#059669'
                        }}>
                          ({citologiaQuantity} vidrio{citologiaQuantity !== 1 ? 's' : ''} de citología{citologiaUrgente ? ' - Urgente 24hs' : ''})
                        </span>
                      )}
                      {isEndoscopiaSelected && endoscopiaSubTypes && endoscopiaSubTypes.length > 0 && (
                        <span style={{
                          marginLeft: '8px',
                          color: '#059669'
                        }}>
                          ({endoscopiaSubTypes.length} sitio{endoscopiaSubTypes.length !== 1 ? 's' : ''})
                        </span>
                      )}
                    </p>
                    {isEndoscopiaSelected && endoscopiaSubTypes && endoscopiaSubTypes.length > 0 && (
                      <p style={{
                        fontSize: '14px',
                        color: '#059669',
                        margin: '4px 0 0 0'
                      }}>
                        Sitios: {endoscopiaSubTypes.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón Continuar */}
          <button
            onClick={() => {
              console.log('🚀 Botón continuar presionado', {
                tissueType,
                isPAPSelected,
                papQuantity,
                isCitologiaSelected,
                citologiaQuantity,
                isEndoscopiaSelected,
                endoscopiaSubTypes
              });
              onNext();
            }}
            disabled={
              !tissueType.trim() || 
              (tissueType === 'Endoscopia' && (!endoscopiaSubTypes || endoscopiaSubTypes.length === 0)) ||
              (tissueType === 'PAP' && (!papQuantity || papQuantity <= 0)) ||
              (tissueType === 'Citología' && (!citologiaQuantity || citologiaQuantity <= 0))
            }
            style={{
              width: '100%',
              fontWeight: 'bold',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '18px',
              border: 'none',
              cursor: (!tissueType.trim() || 
                (tissueType === 'Endoscopia' && (!endoscopiaSubTypes || endoscopiaSubTypes.length === 0)) ||
                (tissueType === 'PAP' && (!papQuantity || papQuantity <= 0)) ||
                (tissueType === 'Citología' && (!citologiaQuantity || citologiaQuantity <= 0))) ? 'not-allowed' : 'pointer',
              background: (!tissueType.trim() || 
                (tissueType === 'Endoscopia' && (!endoscopiaSubTypes || endoscopiaSubTypes.length === 0)) ||
                (tissueType === 'PAP' && (!papQuantity || papQuantity <= 0)) ||
                (tissueType === 'Citología' && (!citologiaQuantity || citologiaQuantity <= 0)))
                ? '#CBD5E1' 
                : `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.darkBlue} 100%)`,
              color: colors.white,
              boxShadow: (!tissueType.trim() || 
                (tissueType === 'Endoscopia' && (!endoscopiaSubTypes || endoscopiaSubTypes.length === 0)) ||
                (tissueType === 'PAP' && (!papQuantity || papQuantity <= 0)) ||
                (tissueType === 'Citología' && (!citologiaQuantity || citologiaQuantity <= 0))) 
                ? 'none' 
                : '0 4px 16px rgba(79, 118, 246, 0.3)',
              opacity: (!tissueType.trim() || 
                (tissueType === 'Endoscopia' && (!endoscopiaSubTypes || endoscopiaSubTypes.length === 0)) ||
                (tissueType === 'PAP' && (!papQuantity || papQuantity <= 0)) ||
                (tissueType === 'Citología' && (!citologiaQuantity || citologiaQuantity <= 0))) ? 0.6 : 1
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <span>
                {(isPAPSelected || isCitologiaSelected) ? 
                  'Ir a Confirmación Final' : 
                  'Continuar al Tipo de Procedimiento'
                }
              </span>
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '15px',
        backgroundColor: colors.white,
        borderTop: '1px solid #E2E8F0'
      }}>
        <button
          onClick={onPrev}
          style={{
            backgroundColor: '#6B7280',
            color: colors.white,
            fontWeight: '600',
            padding: '12px 20px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          <span>Volver al Número</span>
        </button>
      </div>
    </div>
  );
};