![메인](https://coolcleaner.co.kr/fileDownLoad/17081625481134424.jpg)

# BMC - 데이터 크롤링 & 인사이트 추출
최소한의 정보로 다양한 인사이트를 추출 배달 사업장 운영에 도움을 주는 컨텐츠들을 구성하여

대시 보드 형식으로 정보를 제공해주는 사이트 입니다.

배달앱 에서 제공해주지 않는 가공 정보들을 제공하여 새로운 시각에서 고객을 파악 할 수 있도록 도와주고 사업장 운영에서 놓치고 있는 점을 한눈에 파악 할 수 있습니다.
<br><br>

### 라이브 사이트 : [https://cxdpizza.com/login](https://cxdpizza.com/login?PW=1234)

### **● 프로젝트 개발 환경**

**F/E** : Angular16+ , TypeScript

**Module** : bootstrap , Chart.js , Material

**B/E** : Java , Spring Framework 4+ , Mybatis , Selenium

**Server** : Liunx Ubuntu 19

**D/B** : Oracle 10e

**IDE /Tool** : Webstrom , Eclipse , Github , JIRA
<br><br>
### **● 기여도**

**100% / 단독 개발**
<br><br>
### SCREEN

![메인이미지](https://coolcleaner.co.kr/fileDownLoad/170697350657523.jpg)

## **주요 기능 설명**
![화면](https://coolcleaner.co.kr/fileDownLoad/1706973563892bmc2.jpg)
### (**1) 주문 단위로 제공되는 데이터의 카테고리 단위 분류**

주문 단위로 제공되는 정보를 카테고리 단위로 분류하여 각각 화면으로 보여줍니다.

주문 정보는 수작업으로 통합하여 정보를 분석 하는 것이 현실적으로 어렵기에

이를 간편하게 해주는 분류 작업부터 시작하였습니다.

![그래프](https://coolcleaner.co.kr/fileDownLoad/17069737279695545.png)
### (2) 데이터 시각화

분류된 정보를 인포그래픽 처리를 통해 한눈에 알아 볼 수 있도록 만들었습니다.

다양한 차트와 테이블을 통해 목적에 맞는 정보를 손쉽게 눈으로 확인 할 수 있습니다.

![크롤링](https://coolcleaner.co.kr/fileDownLoad/1706974213741cr.gif)
### (3) 웹 데이터 크롤링

셀레니움(Selenium)을 통해 실제 사용자 패턴과 동일한 방식으로 데이터 수집을 진행합니다.

수집현황을 SSE(Server Send Event)를 통해 실시간으로 파악할 수 있습니다.

## ○ 주요 적용 기술
![로그인](https://coolcleaner.co.kr/fileDownLoad/170697433097033.png)
### (1) AuthGuard 적용

사업장 인사이트 정보가 포함되어 있는 사이트 이기에 일반 사용자 접속을 차단하고 인증된 사용자만 세부 정보를 확인 할 수 있도록 AuthGuard 보안을 적용 하였습니다.

```tsx
canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authCheck: any = new Promise((resolve) => {
      this.hs.httpPost('adminSessionCheck.do', null).then((data: any) => {
        if (!data) {
          this.router.navigate(['/login']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    return authCheck;
  }
```

### (2) SSE (Server Send Event) 구현

실시간 크롤링 데이터 현황 파악을 위해 SSE를 구현하여 적용하였습니다.

```tsx
bmCrawling() {
    this.crawlingText = '';
    const params = '?brand=' + this.brandSelect + '&time=' + this.favoriteSeason;
    this.source = new EventSource(this.hs.localHost + 'crawlingBot.do' + params);
    this.source.onmessage = (message: any) => {
      this.zone.run(() => {
        if (message.data == '[시스템] 수집 종료') {
          this.changeText(message.data);
          this.source.close();
        } else {
          this.changeText(message.data);
        }
      })
    }
    this.source.onerror = () => {
      this.source.close();
    }
  }
```

렌더링을 맞춰주기 위해 `NgZone`을 적용하였습니다.

### (3) Selenium을 통한 데이터 크롤링
![크롤링이미지](https://coolcleaner.co.kr/fileDownLoad/17069745781584343.png)
안정적인 데이터 수집을 위해 Selenium을 적용하여 실제 사용자 이용 방식과 유사하게 크롤러를 구성하였습니다. 비정상 로그 감지를 우회하고 시스템에 무리를 주지 않고 데이터를 수집합니다.

```java
public void driverSetting() {
		// WebDriver 경로 설정
		System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

		// 2. WebDriver 옵션 설정
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--start-maximized");
		options.addArguments("--disable-popup-blocking");
		options.addArguments("--window-size=1920,1080");
//						options.addArguments("--headless");
//						options.addArguments("--no-sandbox");
//						options.addArguments("--disable-dev-shm-usage");
		driver = new ChromeDriver(options);
	}

public SseEmitter activateBot(int time, String brand) throws Exception {

		driverSetting();
		url = "https://self.baemin.com";

		List<Map<String, Object>> returnList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> returnList2 = new ArrayList<Map<String, Object>>();
		String file = "C:\\cookie\\cookie.file";
//		String file = "/home/ubuntu/cookie/cookie.file";
		try {
			sseSend("[시스템] 크롤러 브라우저 접속");
			driver.get(url);
			try {
				sseSend("[일반] 쿠키 로드");
				loadCookie(file, driver);
			} catch (Exception e) {
				sseSend("[일반] 쿠키 로드실패");
				Thread.sleep(2000);
				element = driver.findElement(By.name("id"));
				element.sendKeys("***");
				element = driver.findElement(By.name("password"));
				element.sendKeys("***");
				element = driver.findElement(By.className("Button__StyledButton-sc-1cxc4dz-0"));
				element.submit();
				Thread.sleep(3000);
				saveCookie(file, driver);
				sseSend("[시스템] 로그인");
			}
			Thread.sleep(2000);
...
```

주요 구간 단위로 시스템 로그를 만들어 SSE를 통해 클라이언트가 진행상황을 확인 할 수 있게 하며 엘리먼트 구조의 변화에 대처하기 위해 className , xPath를 적절하게 구성하여 배치하였습니다.

```java
public void saveCookie(String filename, WebDriver driver) {
		Set<org.openqa.selenium.Cookie> myCookies = driver.manage().getCookies();
		for (org.openqa.selenium.Cookie getcookies : myCookies) {
			driver.manage().addCookie(getcookies);
		}
		String path = filename;
		File CookieFile = new File(path);
		byte[] repr = SerializationUtils.serialize((Serializable) myCookies);
		FileOutputStream stream = null;
		try {
			stream = new FileOutputStream(CookieFile);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		try {
			stream.write(repr);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
```

Cookie정보의 저장 및 불러오기 방식을 통해 사용자 접속과 동일한 환경을 구성하였습니다.

