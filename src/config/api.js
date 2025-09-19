// API 설정 파일
const API_CONFIG = {
  // 개발 환경 (로컬)
  development: {
    baseURL: '/api', // Vite 프록시 사용
    useProxy: true
  },
  // 프로덕션 환경 (배포)
  production: {
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.neople.co.kr',
    useProxy: false
  }
};

// 현재 환경 감지
const getCurrentEnvironment = () => {
  // 브라우저 환경에서 hostname으로 판단
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return (hostname === 'localhost' || 
            hostname === '127.0.0.1' || 
            hostname === '0.0.0.0') ? 'development' : 'production';
  }
  
  return 'production'; // 기본값
};

// 현재 환경에 맞는 API 설정 반환
export const getApiConfig = () => {
  const env = getCurrentEnvironment();
  return API_CONFIG[env];
};

// API URL 생성 헬퍼 함수
export const buildApiUrl = (endpoint) => {
  const config = getApiConfig();
  return `${config.baseURL}${endpoint}`;
};

// 환경 정보 로깅 (개발 시에만)
export const logEnvironmentInfo = () => {
  const env = getCurrentEnvironment();
  const config = getApiConfig();
  
  if (env === 'development') {
    console.log('🔧 개발 환경에서 실행 중');
    console.log('📡 API 설정:', config);
  } else {
    console.log('🚀 프로덕션 환경에서 실행 중');
    console.log('📡 API 설정:', config);
  }
};
