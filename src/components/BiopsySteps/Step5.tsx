import React from 'react';
import { ArrowLeft, ArrowRight, Shield, Check, X } from 'lucide-react';

interface Step5Props {
  declassify: string;
  onDeclassifyChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step5: React.FC<Step5Props> = ({
  declassify,
  onDeclassifyChange,
  onNext,
  onPrev
}) => {
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

  const currentStep = 5;
  const totalSteps = 7;

  // Barra de progreso
  const ProgressBar = () => (
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
      <ProgressBar />
      
      {/* Header Compacto */}
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
            <Shield style={{ width: '26px', height: '26px', color: colors.white }} />
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
            5
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
            🔒 Desclasificación
          </h1>
          <p style={{
            fontSize: '14px',
            color: colors.darkGray,
            margin: '0',
            lineHeight: '1.3'
          }}>
            ¿Requiere desclasificación de la muestra?
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 15px'
      }}>
        
        <div style={{
          backgroundColor: colors.white,
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          width: '100%'
        }}>
          
          {/* Título del paso */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <Shield style={{ width: '24px', height: '24px', color: colors.primaryBlue }} />
            <h2 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#1F2937',
              margin: '0'
            }}>
              ¿Desclasificar?
            </h2>
          </div>

          <p style={{
            fontSize: '16px',
            color: colors.darkGray,
            marginBottom: '32px'
          }}>
            Indique si la muestra requiere proceso de desclasificación
          </p>

          {/* Opciones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            
            {/* Opción SÍ */}
            <button
              onClick={() => onDeclassifyChange('Sí')}
              style={{
                width: '100%',
                padding: '24px',
                borderRadius: '16px',
                border: `3px solid ${declassify === 'Sí' ? colors.green : '#E5E7EB'}`,
                backgroundColor: declassify === 'Sí' ? '#ECFDF5' : colors.white,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                transform: declassify === 'Sí' ? 'scale(1.02)' : 'scale(1)',
                boxShadow: declassify === 'Sí' ? `0 0 0 3px rgba(81, 207, 102, 0.1)` : 'none'
              }}
              onMouseOver={(e) => {
                if (declassify !== 'Sí') {
                  e.currentTarget.style.borderColor = colors.green;
                  e.currentTarget.style.backgroundColor = '#F0FDF4';
                  e.currentTarget.style.transform = 'scale(1.01)';
                }
              }}
              onMouseOut={(e) => {
                if (declassify !== 'Sí') {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.backgroundColor = colors.white;
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: declassify === 'Sí' ? colors.green : '#F3F4F6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <Check style={{ 
                      width: '24px', 
                      height: '24px', 
                      color: declassify === 'Sí' ? colors.white : colors.darkGray 
                    }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: declassify === 'Sí' ? colors.green : '#1F2937',
                      marginBottom: '4px'
                    }}>
                      Sí
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: declassify === 'Sí' ? '#047857' : colors.darkGray
                    }}>
                      Requiere desclasificación
                    </div>
                  </div>
                </div>
                {declassify === 'Sí' && (
                  <div style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: colors.green,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check style={{ width: '18px', height: '18px', color: colors.white }} />
                  </div>
                )}
              </div>
            </button>

            {/* Opción NO */}
            <button
              onClick={() => onDeclassifyChange('No')}
              style={{
                width: '100%',
                padding: '24px',
                borderRadius: '16px',
                border: `3px solid ${declassify === 'No' ? '#EF4444' : '#E5E7EB'}`,
                backgroundColor: declassify === 'No' ? '#FEF2F2' : colors.white,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                transform: declassify === 'No' ? 'scale(1.02)' : 'scale(1)',
                boxShadow: declassify === 'No' ? `0 0 0 3px rgba(239, 68, 68, 0.1)` : 'none'
              }}
              onMouseOver={(e) => {
                if (declassify !== 'No') {
                  e.currentTarget.style.borderColor = '#EF4444';
                  e.currentTarget.style.backgroundColor = '#FEF2F2';
                  e.currentTarget.style.transform = 'scale(1.01)';
                }
              }}
              onMouseOut={(e) => {
                if (declassify !== 'No') {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.backgroundColor = colors.white;
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: declassify === 'No' ? '#EF4444' : '#F3F4F6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <X style={{ 
                      width: '24px', 
                      height: '24px', 
                      color: declassify === 'No' ? colors.white : colors.darkGray 
                    }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: declassify === 'No' ? '#DC2626' : '#1F2937',
                      marginBottom: '4px'
                    }}>
                      No
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: declassify === 'No' ? '#DC2626' : colors.darkGray
                    }}>
                      No requiere desclasificación
                    </div>
                  </div>
                </div>
                {declassify === 'No' && (
                  <div style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#EF4444',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check style={{ width: '18px', height: '18px', color: colors.white }} />
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* Información adicional */}
          <div style={{
            backgroundColor: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '32px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#0369A1',
              margin: '0 0 12px 0'
            }}>
              ℹ️ Información sobre desclasificación:
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '12px',
              fontSize: '14px',
              color: '#0C4A6E'
            }}>
              <div>
                <strong>• Sí:</strong> La muestra requiere proceso especial de desclasificación antes del análisis
              </div>
              <div>
                <strong>• No:</strong> La muestra puede procesarse con el protocolo estándar
              </div>
              <div>
                <strong>• Impacto:</strong> Las muestras desclasificadas pueden requerir tiempo adicional de procesamiento
              </div>
            </div>
          </div>

          {/* Confirmación de selección */}
          {declassify && (
            <div style={{
              background: '#F0FDF4',
              border: `2px solid ${colors.green}`,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px' 
              }}>
                <Check style={{ width: '20px', height: '20px', color: colors.green }} />
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#065F46' 
                }}>
                  ✅ Seleccionado: {declassify === 'Sí' ? 'Requiere desclasificación' : 'No requiere desclasificación'}
                </span>
              </div>
            </div>
          )}

          {/* Botón continuar integrado */}
          <button
            onClick={onNext}
            disabled={!declassify}
            style={{
              width: '100%',
              fontWeight: 'bold',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '18px',
              border: 'none',
              cursor: declassify ? 'pointer' : 'not-allowed',
              background: declassify 
                ? `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.darkBlue} 100%)` 
                : '#CBD5E1',
              color: colors.white,
              boxShadow: declassify ? '0 4px 16px rgba(79, 118, 246, 0.3)' : 'none',
              transition: 'all 0.3s ease',
              opacity: declassify ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (declassify) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 118, 246, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (declassify) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(79, 118, 246, 0.3)';
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <span>Continuar a Servicios Adicionales</span>
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Botón de navegación hacia atrás */}
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
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#4B5563';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#6B7280';
          }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          <span>Volver a Cantidad de Material</span>
        </button>
      </div>
    </div>
  );
};