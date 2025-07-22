import React from 'react';
import { ArrowLeft, ArrowRight, FileText, Scissors, Check } from 'lucide-react';

interface Step3Props {
  type: string;
  onTypeChange: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3: React.FC<Step3Props> = ({
  type,
  onTypeChange,
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

  const currentStep = 3;
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
            <FileText style={{ width: '26px', height: '26px', color: colors.white }} />
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
            3
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
            🩺 Tipo de Procedimiento
          </h1>
          <p style={{
            fontSize: '14px',
            color: colors.darkGray,
            margin: '0',
            lineHeight: '1.3'
          }}>
            Seleccione el tipo de procedimiento médico
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
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1F2937',
              margin: '0 0 8px 0'
            }}>
              Tipo de Procedimiento
            </h2>
            <p style={{
              fontSize: '16px',
              color: colors.darkGray,
              margin: '0'
            }}>
              Seleccione el tipo de muestra que está procesando
            </p>
          </div>

          {/* Opciones de tipo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            
            {/* Opción BX - Biopsia */}
            <button
              onClick={() => onTypeChange('BX')}
              style={{
                width: '100%',
                padding: '24px',
                borderRadius: '16px',
                border: `3px solid ${type === 'BX' ? colors.primaryBlue : '#E5E7EB'}`,
                backgroundColor: type === 'BX' ? '#EBF4FF' : colors.white,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                transform: type === 'BX' ? 'scale(1.02)' : 'scale(1)',
                boxShadow: type === 'BX' ? `0 0 0 3px rgba(79, 118, 246, 0.1)` : 'none'
              }}
              onMouseOver={(e) => {
                if (type !== 'BX') {
                  e.currentTarget.style.borderColor = colors.lightBlue;
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.transform = 'scale(1.01)';
                }
              }}
              onMouseOut={(e) => {
                if (type !== 'BX') {
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
                    backgroundColor: type === 'BX' ? colors.primaryBlue : '#F3F4F6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <Scissors style={{ 
                      width: '24px', 
                      height: '24px', 
                      color: type === 'BX' ? colors.white : colors.darkGray 
                    }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: type === 'BX' ? colors.primaryBlue : '#1F2937',
                      marginBottom: '4px'
                    }}>
                      BX - Biopsia
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: type === 'BX' ? '#1E40AF' : colors.darkGray
                    }}>
                      Muestra de tejido para análisis histopatológico
                    </div>
                  </div>
                </div>
                {type === 'BX' && (
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

            {/* Opción PQ - Pieza Quirúrgica */}
            <button
              onClick={() => onTypeChange('PQ')}
              style={{
                width: '100%',
                padding: '24px',
                borderRadius: '16px',
                border: `3px solid ${type === 'PQ' ? colors.primaryBlue : '#E5E7EB'}`,
                backgroundColor: type === 'PQ' ? '#EBF4FF' : colors.white,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                transform: type === 'PQ' ? 'scale(1.02)' : 'scale(1)',
                boxShadow: type === 'PQ' ? `0 0 0 3px rgba(79, 118, 246, 0.1)` : 'none'
              }}
              onMouseOver={(e) => {
                if (type !== 'PQ') {
                  e.currentTarget.style.borderColor = colors.lightBlue;
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.transform = 'scale(1.01)';
                }
              }}
              onMouseOut={(e) => {
                if (type !== 'PQ') {
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
                    backgroundColor: type === 'PQ' ? colors.primaryBlue : '#F3F4F6',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <FileText style={{ 
                      width: '24px', 
                      height: '24px', 
                      color: type === 'PQ' ? colors.white : colors.darkGray 
                    }} />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: type === 'PQ' ? colors.primaryBlue : '#1F2937',
                      marginBottom: '4px'
                    }}>
                      PQ - Pieza Quirúrgica
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: type === 'PQ' ? '#1E40AF' : colors.darkGray
                    }}>
                      Muestra quirúrgica completa para análisis detallado
                    </div>
                  </div>
                </div>
                {type === 'PQ' && (
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
              ℹ️ Información sobre tipos de procedimiento:
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '12px',
              fontSize: '14px',
              color: '#0C4A6E'
            }}>
              <div>
                <strong>• BX (Biopsia):</strong> Muestra pequeña de tejido obtenida mediante procedimiento mínimamente invasivo
              </div>
              <div>
                <strong>• PQ (Pieza Quirúrgica):</strong> Muestra completa obtenida durante procedimiento quirúrgico mayor
              </div>
              <div>
                <strong>• Procesamiento:</strong> Ambos tipos requieren técnicas similares pero pueden diferir en tiempos y protocolos
              </div>
            </div>
          </div>

          {/* Confirmación de selección */}
          {type && (
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
                  ✅ Tipo seleccionado: {type === 'BX' ? 'Biopsia' : 'Pieza Quirúrgica'}
                </span>
              </div>
            </div>
          )}

          {/* Botón continuar integrado */}
          <button
            onClick={onNext}
            disabled={!type}
            style={{
              width: '100%',
              fontWeight: 'bold',
              padding: '16px',
              borderRadius: '14px',
              fontSize: '18px',
              border: 'none',
              cursor: type ? 'pointer' : 'not-allowed',
              background: type 
                ? `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.darkBlue} 100%)` 
                : '#CBD5E1',
              color: colors.white,
              boxShadow: type ? '0 4px 16px rgba(79, 118, 246, 0.3)' : 'none',
              transition: 'all 0.3s ease',
              opacity: type ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (type) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 118, 246, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (type) {
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
              <span>Continuar a Cantidad de Material</span>
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
          <span>Volver al Tipo de Tejido</span>
        </button>
      </div>
    </div>
  );
};