# [ ROLIC ] 우리 동네 라멘 맛집 모아보기

![ROLIC_THUMBNAIL](https://velog.velcdn.com/images/pmb087/post/36f8cb6e-3ddf-4c4d-b1be-84c5293b5f0f/image.gif)
~~용량을 낮춰서 움짤을 만들다 보니 잔상이 많이 남는다...~~

---

<br/>

### **시작하게 된 계기**

> 평소에 라멘을 많이 즐겨먹고, 친구들과 저녁약속을 잡을 때는 대부분 라멘을 먹는다.
>
> 오늘은 어떤 라멘을 먹어야 할지 늘 고민이 있었다.
>
> 지금 근처에 라멘 맛집이 있는지 찾아보기 위해서는 지도 어플을 켜고 라멘을 검색한 뒤
>
> 리뷰를 확인, 주차 가능 여부를 파악 등등 확인 할 일이 너무 많았다.
>
> 마침 취업 준비를 하며 이것 저것 하느라 바빴던 시기가 지나고 잠깐 짬이 났기에
>
> 나만의 라멘 맛집 정리 지도를 만들어보자는 생각이 들었다.
>
> 이전에 진행한 프로젝트들은 모두 팀 프로젝트로 진행되었기 때문에
>
> 이번에는 혼자서 해보자는 생각이 들었다.

---

<br/>

### **How to Start**

<br/>

1. 프로젝트를 실행하고자 하는 경로에서 아래 명령어 실행

```bash
git clone https://github.com/pmb087/project-rolic.git
```

<br/>

2. clone 명령어를 통해 생성된 폴더를 VSCODE(또는 기타 코드 에디터) 를 통해 열어준 뒤 아래 명령어 실행

```bash
npm install
```

<br/>

3. [Json-Server API](https://github.com/pmb087/rolic-json-server.git)를 clone 명령어를 통해 복사한 뒤 실행

   (배포된 Json-Server API를 사용하려면 해당 과정은 무시)

<br/>

4.  `/utils/service/CustomAxios.ts` 경로에 접근한 뒤 baseURL을 Json-Server가 실행된 포트로 변경

    (배포된 Json-Server API를 사용하려면 해당 과정은 무시)

```typescript
const client = axios.create({
  baseURL: 'YOUR_API_ADDRESS'
});
```

<br/>

5. 아래 명령어로 프로젝트 실행

```bash
npm run build  // published
npm start

or

npm run dev  // development
```

---

<br/>

### **Tech Stacks**

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
<img src="https://img.shields.io/badge/JSON SERVER-FFE033?style=for-the-badge&" />
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white" />
<img src="https://img.shields.io/badge/kakao maps-FFCD00?style=for-the-badge&logo=kakao&logoColor=black" />
<img src="https://img.shields.io/badge/Google Login-4285F4?style=for-the-badge&logo=Google&logoColor=white" />

---

<br/>

### **초기 API 기획**

- Json-Server 활용한 API 구축

  - 백엔드 개발자 없이 개인으로 서버를 구축할 때 가장 러닝커브가 낮은 Json-Server를 이용했습니다.

- 서버 배포
  - heroku는 AWS를 기반으로 동작합니다, 다만 AWS와는 다르게 세부적인 설정을 신경쓰지 않고
    push한번에 배포까지 손쉽게 완료할 수 있기 때문에 다른곳에 신경쓰지 않고 간단하게 배포하기에는 최적이라고 생각하여 heroku를 이용했습니다.

---

<br/>

### **초기 UI 시안**

![Figma](https://velog.velcdn.com/images/pmb087/post/dea540c9-aaa1-4642-b011-0d22332f0076/image.PNG)

> Figma 이용해서 초기 UI를 설계했습니다, 이유는 아래와 같습니다.

- 디자인 관련 지식이 없기 때문에 미리 설계하지 않으면 빈번한 수정이 불가피.

- 실제 구현 당시 **Figma** 도안의 **px** 단위 가이드가 작업 능률에 직접적으로 도움이 됨.

---

<br/>

### **주요 로직**

<br/>

#### **구글 로그인**

<br/>

![Main](https://velog.velcdn.com/images/pmb087/post/ee0d73e6-4fee-48b6-aa4b-2e14fe558626/image.PNG)

- CLICK 태그가 붙은 로고를 클릭하면 로그인 없이 비로그인 상태로 **/Map** 경로로 이동합니다.
- 하단의 구글 로그인을 진행하면 콜백함수의 실행 결과로 **/LoggedInMap**으로 이동합니다.

```typescript
// 구글로그인 콜백함수
function GoogleLogin({ option }: Props) {
  const route = useRouter();
  const googleSignInButton = useRef<HTMLDivElement>(null);

 const useCredential = (response: GApiResponse) => {
    const { email, name, picture }: DecodedResponse = jwt_decode(
      response.credential
    );

    LocalStorageService.set('user', email);
    UserService.signUp(email, name, picture).catch((error) => {
      if (error.message === 'Insert failed, duplicate id') {
        return;
      }
    });
    route.push('/LoggedInMap');
  };
```

<br/>

#### **카카오맵 API**

- **InfoWindow** 기능을 이용하여 **MouseOver**, *MouseLeave*이벤트를 추가하고 지도 상에서 해당 마커가 어떤 가게인지 알 수 있도록 했습니다.
- **mouse over, out** 이벤트를 통해서 각각의 마커에 할당된 **InfoWindow**를 볼 수 있게 했습니다.
- 지도 페이지에서 **Props**로 내려받은 **SetState**함수를 마커의 **OnClick**으로 넘겨주어 페이지 우측에 클릭한 마커의 가게 정보를 표시할 수 있게 했습니다.

```typescript
kakao.maps.event.addListener(marker, 'mouseover', function () {
  infowindow.open(map, marker);
});
kakao.maps.event.addListener(marker, 'mouseout', function () {
  infowindow.close();
});
kakao.maps.event.addListener(marker, 'click', function () {
  setSelectedId(id);
});
```

<br/>

#### **스크립트 관련 hooks**

- 카카오맵과 구글로그인은 동일하게 **Script**를 이용해서 해당 기능을 제공받습니다.
  따라서 스크립트를 추가하는 로직을 **Hooks**를 통해 관심사를 분리했습니다.

- **useScript**는 **Script**를 통해 기능을 제공받을 링크와
  해당 기능을 로드하는 `script.onload`에 할당 될 함수를 인자로 받아서 동작합니다.

- 로직 내부에 `typeof document !== 'undefined'` 라는 조건을 추가한 이유

  - **Next.js**는 서버쪽과 클라이언트 측에서 모두 움직이는 프레임워크입니다.
  - 때문에 **document, window**와 같은 클라이언트 측에서만 정의된 전역 변수는 렌더링 이후에만 사용할 수 있습니다.

  ```typescript
  //useScript

  const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;

  const useScript = (type: 'Login' | 'Map', onload: () => void) => {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');

      script.async = true;
      script.defer = true;
      script.onload = onload;
      let scriptSrc = '';

      if (type === 'Login')
        scriptSrc = `https://accounts.google.com/gsi/client`;
      else if (type === 'Map')
        scriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;

      script.src = scriptSrc;
      document.head.appendChild(script);
    }
  };

  export default useScript;
  ```

<br/>

#### **가게 정보 관련 로직**

- 지도 페이지 우측에 가게 정보를 표시하는 **Aside** 메뉴를 자세히 보면, 비슷한 스타일의 3가지 문단 **[주소, 메뉴, 주차정보]** 가 있습니다.
- 이중 메뉴 단락은 여러가지 메뉴를 받아오기 때문에 변수의 타입이 **string[]** 이었습니다.

- 타입스크립트의 특성 상 넘겨받은 Props의 타입을 정확하게 기입해야 합니다.
- 때문에 **string** 을 **Props**로 받을 때와 **sring[]** 을 **Props**로 받을 경우 두가지를 모두 고려하여 로직을 구현했습니다.

```typescript
//Info.tsx

interface Props {
  title: string;
  content: string | string[];
}

function Info({ title, content }: Props) {
  return (
    <InfoWrap>
      <InfoTitle>{title}</InfoTitle>
      {!Array.isArray(content) ? (
        <InfoContent>{content}</InfoContent>
      ) : (
        content.map((item: string) => (
          <InfoContent ntent nfoContent key={item}>
            {item}
          </InfoContent>
        ))
      )}
    </InfoWrap>
  );
}
```

<br/>

#### **LocalStorage Type**

- 타입스크립트에서 로컬스토리지를 활용할 때 두가지의 경우가 있습니다.

  - 단순한 문자열을 저장하고 가져올 때
  - 객체나 배열 등, **Reference** 타입을 저장하고 가져올 때

- 후자의 경우 타입스크립트의 특성 상 **get**으로 가져온 데이터의 타입을 추론할 수 업습니다.
- 이러한 경우를 핸들링 하기 위해서 **LocalStorageService** 파일을 생성하여 관리했습니다.

```typescript
class LocalService {
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    if (data) {
      const parsedData: T = JSON.parse(data);
      return parsedData;
    }

    return null;
  }

  set(key: string, item: unknown) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  has(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export default new LocalService();
```

<br/>

#### **Redirect 로직**

- 해당 프로젝트에 존재하는 여러 페이지는 로그인 시 접근 할 수 있는 페이지와 그렇지 않은 페이지가 있습니다.
- 따라서 페이지에 접근 한 유저의 상태를 판별하여 **Redirection**하는 로직을 여러차례 선언해야 했습니다.
- 해당 로직들을 공통화하여 **Custom Hook**으로 분리했습니다.

```typescript
export default function useRedirect(
  url: Url,
  getUser?: (user: string) => Promise<void>
) {
  const { push } = useRouter();

  const goToMapByLoginStatus = () => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser === null) return;
    push(url);
  };

  const ifLoggedInGetInfoElsePush = (
    callBack: (user: string) => Promise<void>
  ) => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser !== null) {
      callBack(currentUser);
    } else {
      push(url);
    }
  };

  useEffect(() => {
    if (getUser !== undefined) ifLoggedInGetInfoElsePush(getUser);
    else goToMapByLoginStatus();
  }, []);
}
```

- 해당 **Custom Hook**은 사용할 수있는 무언가를 반환하는 것이 아닌 자체적으로 로직을 실행합니다.
- 아래와 같이 사용됩니다.

```typescript
useRedirect('/Map' as unknown as Url, getUserInfo);
```

- 위에서 `getUserInfo`는 유저 정보를 요청하는 **Custom Hooks**을 통해 반환된 함수입니다.
- 위의 경우엔 `useRedirect`의 콜백함수로 사용됩니다.

<br/>

#### **유저, 관리자 정보 요청**

- 로그인 후 접근이 가능한 페이지의 경우는 접속중인 유저의 정보가 필요합니다.
- 또한 해당 유저가 관리자인지 판별해야 합니다.
- 이러한 로직을 페이지, 컴포넌트 별로 재작성 한다면 유지보수에 있어서 매우 불리합니다.
- 따라서 **현재 유저 정보, 관리자 여부** 를 판단하는 **Custom Hook**을 만들어서 분리했습니다.
  - `useGetUser`의 호출옵션인 `imediate: boolean`를 통해 호출과 동시에 유저 정보를 업데이트 할 것인지 지정할 수 있습니다.
  - 위의 예로는 비로그인 상태로 **/LoggedInMap** 경로에 접근시 `useRedirect` **Custom Hook**에서 실행 할 콜백 함수로 넘겨주어 실행 시점을 제어하는 경우가 있습니다.

```typescript
export default function useGetUser(imediate: boolean) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentUserInfo, setCurrentUserInfo] = useState<UserResponse>();

  const getUserInfo = async (user: string) => {
    const userInfo = await UserService.getUser(user);
    const adminInfo = await UserService.getAdmin();

    setCurrentUserInfo(userInfo.data);
    setIsAdmin(adminInfo.data.includes(userInfo.data.id));
  };

  useEffect(() => {
    if (imediate) {
      const currentUser = LocalStorageService.get<string>('user');
      if (currentUser !== null) getUserInfo(currentUser);
    }
  }, []);

  return {isAdmin, currentUserInfo, getUserInfo};
```

<br/>

#### **컴포넌트 별 문자열 상태 관리**

- 아래의 경우는 모두 각각의 컴포넌트에 새로운 문자열 상태와 해당 상태를 관리하는 로직을 선언해야 합니다.

  - 사용자가 관리자에게 가게 추가를 요청하는 글을 작성하는 경우 (요청 제목, 요청 내용)
  - 관리자가 요청 글을 확인한 뒤 가게를 추가하는 경우(가게 정보에 관한 모든 사항)

- 이런 반복적이고 단순한 코드량의 증가와 유지보수 난이도를 악화시키는 상황을 막고자 **Custom Hook** 으로 분리했습니다.

```typescript
export default function useHandleInput() {
  const [input, setInput] = useState<string>('');

  const handleInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    setInput(value);
  };

  return { input, handleInput, setInput };
}
```

- 해당 로직을 사용하는 컴포넌트에서는 아래와 같이 간단하게 사용할 수 있습니다.

  ```typescript
  // 단순 사용
  const { input, handleInput, setInput } = useHandleInput();

  // 사용 할 이름을 지정해서 사용
  const {
    input: textarea,
    handleInput: handleTextarea,
    setInput: setTextarea
  } = useHandleInput();
  ```

<br/>

#### **SSR, SSG**

- 지도페이지는 비로그인시 **/Map** , 로그인시 **/LoggedInMap** 으로 다른 페이지로 접속됩니다.
  - 비로그인시는 가게 별 찜하기 기능과 마이페이지로 이동할 수 있는 **UserMenu**를 제공하지 않기 때문에 이외의 모든 항목은 언제나 같은 결과만 화면에 그려집니다.
  - 따라서 비로그인시 접속되는 **/Map** 페이지는 **getStaticProps**를 사용하여 정적 페이지로 빌드했습니다.
  - 로그인시 접속되는 **/LoggedInMap** 페이지는 **getServerSideProps**를 사용하여 빌드했습니다.

<br/>

#### **마무리, 회고**

<br/>

# [회고록 보러가기](https://velog.io/@pmb087/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Rolic)
