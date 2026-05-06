// Mock 데이터 - 백엔드 API가 준비될 때까지 사용
// Naver Book API 응답 형식을 시뮬레이션

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  stock: number;
  publisher?: string;
  pubdate?: string;
  description?: string;
  image?: string;
  createdAt?: string;
}

// Mock 데이터 (Naver API에서 가져온 것처럼 구성)
let mockBooks: Book[] = [
  {
    id: '1',
    title: '클린 코드',
    author: '로버트 C. 마틴',
    isbn: '9788966260959',
    price: 33000,
    stock: 10,
    publisher: '인사이트',
    pubdate: '2013-12-24',
    description: '애자일 소프트웨어 장인 정신의 대가 로버트 C. 마틴이 전하는 클린 코드의 정석',
    image: 'https://shopping-phinf.pstatic.net/main_3243815/32438155618.20230926071048.jpg',
    createdAt: '2024-01-15T10:30:00',
  },
  {
    id: '2',
    title: '이펙티브 자바',
    author: '조슈아 블로크',
    isbn: '9788966262281',
    price: 36000,
    stock: 15,
    publisher: '인사이트',
    pubdate: '2018-11-01',
    description: '자바 플랫폼 모범 사례 완벽 가이드',
    image: 'https://shopping-phinf.pstatic.net/main_3243236/32432368420.20221019152127.jpg',
    createdAt: '2024-01-20T14:20:00',
  },
  {
    id: '3',
    title: '리팩터링 2판',
    author: '마틴 파울러',
    isbn: '9788966263134',
    price: 35000,
    stock: 8,
    publisher: '한빛미디어',
    pubdate: '2020-04-01',
    description: '코드 구조를 체계적으로 개선하여 효율적인 리팩터링 구현하기',
    image: 'https://shopping-phinf.pstatic.net/main_3249079/32490791688.20221019110717.jpg',
    createdAt: '2024-02-01T09:15:00',
  },
  {
    id: '4',
    title: '오브젝트',
    author: '조영호',
    isbn: '9788998139766',
    price: 30000,
    stock: 20,
    publisher: '위키북스',
    pubdate: '2019-06-17',
    description: '코드로 이해하는 객체지향 설계',
    image: 'https://shopping-phinf.pstatic.net/main_3243815/32438155618.20230926071048.jpg',
    createdAt: '2024-02-10T11:45:00',
  },
  {
    id: '5',
    title: 'DDD Start!',
    author: '최범균',
    isbn: '9788993827446',
    price: 25000,
    stock: 12,
    publisher: '지앤선',
    pubdate: '2016-03-25',
    description: '도메인 주도 설계 구현과 핵심 개념 익히기',
    image: 'https://shopping-phinf.pstatic.net/main_3243815/32438155618.20230926071048.jpg',
    createdAt: '2024-02-15T16:30:00',
  },
  {
    id: '6',
    title: '스프링 부트와 AWS로 혼자 구현하는 웹 서비스',
    author: '이동욱',
    isbn: '9788965402602',
    price: 27000,
    stock: 25,
    publisher: '프리렉',
    pubdate: '2019-12-24',
    description: '인텔리제이, JPA, JUnit 테스트, 그레이들, 소셜 로그인, AWS 인프라로 무중단 배포까지',
    image: 'https://shopping-phinf.pstatic.net/main_3243815/32438155618.20230926071048.jpg',
    createdAt: '2024-03-01T10:00:00',
  },
  {
    id: '7',
    title: '자바 ORM 표준 JPA 프로그래밍',
    author: '김영한',
    isbn: '9788960777330',
    price: 40000,
    stock: 18,
    publisher: '에이콘출판사',
    pubdate: '2015-08-01',
    description: '스프링 데이터 예제 프로젝트로 배우는 전자정부 표준 데이터베이스 프레임워크',
    image: 'https://shopping-phinf.pstatic.net/main_3243815/32438155618.20230926071048.jpg',
    createdAt: '2024-03-05T14:30:00',
  },
  {
    id: '8',
    title: '토비의 스프링 3.1',
    author: '이일민',
    isbn: '9788960773431',
    price: 45000,
    stock: 5,
    publisher: '에이콘출판사',
    pubdate: '2012-03-30',
    description: '스프링 프레임워크의 핵심 원리와 적용 기법',
    image: 'https://shopping-phinf.pstatic.net/main_3243815/32438155618.20230926071048.jpg',
    createdAt: '2024-03-10T09:20:00',
  },
  {
    id: '9',
    title: '모던 자바 인 액션',
    author: '라울-게이브리얼 우르마',
    isbn: '9791162242025',
    price: 36000,
    stock: 22,
    publisher: '한빛미디어',
    pubdate: '2019-08-01',
    description: '람다, 스트림, 함수형, 리액티브 프로그래밍으로 새로워진 자바 마스터하기',
    image: 'https://shopping-phinf.pstatic.net/main_3243815/32438155618.20230926071048.jpg',
    createdAt: '2024-03-15T11:45:00',
  },
  {
    id: '10',
    title: '실전! 스프링 5를 활용한 리액티브 프로그래밍',
    author: '올레 도쿠카',
    isbn: '9791161752686',
    price: 30000,
    stock: 14,
    publisher: '에이콘출판사',
    pubdate: '2020-02-28',
    description: '스프링 프레임워크 5와 리액터를 활용한 리액티브 프로그래밍',
    image: 'https://shopping-phinf.pstatic.net/main_3243815/32438155618.20230926071048.jpg',
    createdAt: '2024-03-20T15:10:00',
  },
];

// 페이지네이션용 도서 목록 조회
export async function fetchBookListPage(page: number, size: number) {
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 300));

  const start = page * size;
  const end = start + size;
  const paginatedBooks = mockBooks.slice(start, end);

  return {
    books: paginatedBooks,
    totalPages: Math.ceil(mockBooks.length / size),
    totalElements: mockBooks.length,
    page: page,
    size: size,
  };
}

// 도서 상세 조회
export async function fetchBookDetail(bookId: string) {
  await new Promise(resolve => setTimeout(resolve, 200));

  const book = mockBooks.find(b => b.id === bookId);
  if (!book) {
    throw new Error('도서를 찾을 수 없습니다.');
  }
  return book;
}

// 도서 등록
export async function createBook(book: Omit<Book, 'id' | 'createdAt'>) {
  await new Promise(resolve => setTimeout(resolve, 300));

  const newBook: Book = {
    ...book,
    id: String(mockBooks.length + 1),
    createdAt: new Date().toISOString(),
  };

  mockBooks.push(newBook);
  return newBook;
}
