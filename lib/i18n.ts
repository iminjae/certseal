export type Locale = "ko" | "en"

export const defaultLocale: Locale = "en"

export const localeStorageKey = "certseal-locale"

export const dictionaries = {
  ko: {
    nav: {
      features: "기능",
      flow: "흐름",
      about: "소개",
      trust: "신뢰 구조",
      contact: "문의",
      startIssuing: "발급 시작",
    },
    hero: {
      title: "인증서를 문서에서 디지털 증명으로.",
      subtitle: "PDF 보고서를 구조화된 인증 데이터로 전환하고, 회사 계정에 귀속되는 SBT 인증서로 발급합니다.",
      cta: "발급 시작",
    },
    heroFlow: [
      {
        step: "01",
        title: "보고서 업로드",
        description: "최종 report.pdf를 인증 데이터 생성의 기준 자료로 사용합니다.",
      },
      {
        step: "02",
        title: "인증 데이터 생성",
        description: "보고서 내용을 구조화된 디지털 인증 데이터로 변환합니다.",
      },
      {
        step: "03",
        title: "회사 계정에 SBT 발급",
        description: "인증 결과를 회사 Smart Account에 양도 불가능한 SBT로 귀속시킵니다.",
      },
      {
        step: "04",
        title: "외부 검증",
        description: "제출처는 인증 상태, 발급자, 소유 회사를 확인할 수 있습니다.",
      },
    ],
    features: {
      badge: "Platform",
      title: "Core Features",
      description: "회사 계정에 귀속되는 디지털 인증서를 발급하고 검증하는 핵심 기능",
      items: [
        {
          title: "보고서 기반 인증 데이터 생성",
          description: "최종 report.pdf를 구조화된 디지털 인증 데이터로 변환합니다.",
        },
        {
          title: "회사 Smart Account",
          description: "ERC-4337 기반 회사 계정으로 인증서를 개인이 아닌 회사 단위로 관리합니다.",
        },
        {
          title: "Certificate SBT 발급",
          description: "인증 결과를 양도 불가능한 SBT로 회사 계정에 귀속시킵니다.",
        },
        {
          title: "DID/VC 발급 서명",
          description: "Stanco DID로 인증 데이터를 서명하여 발급자 신뢰를 검증할 수 있게 합니다.",
        },
        {
          title: "On-chain Registry",
          description: "인증 데이터 hash, VC hash, 상태값을 블록체인 Registry에 기록합니다.",
        },
        {
          title: "Public Verification",
          description: "외부 제출처는 인증 상태, 발급자, 소유 회사를 확인할 수 있습니다.",
        },
      ],
    },
    flow: {
      title: "Issuance Flow",
      steps: [
        {
          title: "회사 로그인",
          description: "회사는 이메일/소셜 로그인 후 회사 Smart Account를 생성합니다.",
        },
        {
          title: "보고서 업로드",
          description: "최종 report.pdf를 업로드합니다.",
        },
        {
          title: "인증 데이터 생성",
          description: "보고서를 기반으로 구조화된 Certificate Data를 생성합니다.",
        },
        {
          title: "VC 서명 및 Registry 기록",
          description: "Stanco DID로 서명하고 핵심 hash와 상태를 온체인에 기록합니다.",
        },
        {
          title: "SBT 발급",
          description: "회사 Smart Account에 Certificate SBT를 발급합니다.",
        },
        {
          title: "외부 검증",
          description: "외부 제출처는 SBT, Registry, VC를 기준으로 인증 상태를 검증합니다.",
        },
      ],
    },
    trust: {
      topTitle: "About CertSeal",
      topSubtitle: "문서 중심 인증을 회사 계정에 귀속되는 디지털 인증으로 전환합니다.",
      cardTitle: "정적인 보고서에서 디지털 인증서로",
      body: [
        "기존 인증서는 PDF 파일로 발급되고, 이메일이나 파일 형태로 전달되며, 사람이 직접 확인해야 했습니다.",
        "CertSeal은 최종 report.pdf를 구조화된 디지털 인증 데이터로 변환하고, Stanco DID 기반 VC 서명과 온체인 Registry를 통해 검증 가능한 인증 상태를 만듭니다.",
        "발급된 인증은 회사 Smart Account에 Certificate SBT로 귀속되며, 외부 검증자는 해당 회사가 신뢰 가능한 발급기관이 발급한 유효한 디지털 인증서를 보유하고 있는지 확인할 수 있습니다.",
      ],
      layerTitle: "Trust Layer",
      layerDescription: "디지털 인증서가 신뢰될 수 있도록 발급자, 소유자, 상태를 각각 검증합니다.",
      cards: [
        {
          title: "ERC-4337 Company Account",
          description: "회사의 디지털 계정이 인증 SBT의 소유자가 됩니다.",
        },
        {
          title: "Stanco DID / VC",
          description: "발급기관 DID로 인증 데이터를 서명해 발급자를 검증합니다.",
        },
        {
          title: "Certificate SBT",
          description: "인증 결과를 양도 불가능한 토큰으로 회사 계정에 귀속시킵니다.",
        },
        {
          title: "On-chain Registry",
          description: "인증 상태와 핵심 hash를 블록체인에 기록해 사후 조작을 어렵게 만듭니다.",
        },
      ],
    },
    contact: {
      title: "문의하기",
      description: "CertSeal 발급 플로우, 회사 계정 연동, 검증 구조 도입이 필요하다면 문의를 남겨주세요.",
      name: "이름",
      email: "이메일",
      phone: "연락처",
      message: "메시지",
      submit: "문의 보내기",
      info: {
        email: "이메일",
        phone: "상담",
        address: "운영",
        emailValue: "contact@certseal.io",
        phoneValue: "Demo request",
        addressValue: "Seoul, Korea",
      },
    },
    auth: {
      common: {
        brand: "CertSeal",
        companyAuthTitle: "회사 단위 인증",
        companyAuthDescription: "인증서는 개인 지갑이 아니라 회사 Smart Account에 귀속됩니다.",
        smartAccountCreated: "Company Smart Account created",
      },
      login: {
        title: "다시 시작하기",
        subtitle: "회사에 귀속된 디지털 인증서를 관리하려면 로그인하세요.",
        email: "이메일",
        password: "비밀번호",
        submit: "로그인",
        google: "Google로 계속하기",
        forgot: "비밀번호를 잊으셨나요?",
        createPrefix: "계정이 없나요?",
        createAccount: "회원가입",
        description: "회사 계정은 발급된 Certificate SBT를 보유하고 관리하는 기준 계정으로 사용됩니다.",
      },
      register: {
        title: "회사 계정 만들기",
        subtitle: "디지털 인증서 SBT를 발급하고 보유할 회사 계정을 등록하세요.",
        workEmail: "업무용 이메일",
        password: "비밀번호",
        companyName: "회사명",
        managerName: "담당자명",
        smartAccountTitle: "Company Smart Account",
        smartAccountDescription: "회원가입 완료 후 회사용 Smart Account가 자동 생성됩니다.",
        technicalNote: "ERC-4337 기반 계정을 내부적으로 생성하며, 사용자는 회사 정보만 등록하면 됩니다.",
        submit: "계정 만들기",
        signInPrefix: "이미 계정이 있나요?",
        signIn: "로그인",
      },
      forgot: {
        title: "비밀번호 재설정",
        subtitle: "이메일을 입력하면 재설정 링크를 보내드립니다.",
        email: "이메일",
        submit: "재설정 링크 보내기",
        back: "로그인으로 돌아가기",
        successTitle: "재설정 링크를 보냈습니다",
        successDescription: "이메일함에서 비밀번호 재설정 안내를 확인하세요.",
      },
      dashboard: {
        title: "Company Dashboard",
        subtitle: "회사 계정에 귀속된 디지털 인증서를 관리합니다.",
        company: "Company",
        manager: "Manager",
        smartAccount: "Company Smart Account",
        issuedCertificates: "Issued Certificates",
        issueFirst: "Issue First Certificate",
        signOut: "Sign out",
        emptyCompany: "A Company",
        ownershipNote: "Certificate SBT ownership is bound to this company smart account.",
      },
    },
  },
  en: {
    nav: {
      features: "Features",
      flow: "Flow",
      about: "About",
      trust: "Trust Layer",
      contact: "Contact",
      startIssuing: "Start Issuing",
    },
    hero: {
      title: "Certify. Bind. Verify.",
      subtitle:
        "Convert final report PDFs into verifiable digital certificates, bound to each company account as non-transferable SBTs.",
      cta: "Start Issuing",
    },
    heroFlow: [
      {
        step: "01",
        title: "Report Upload",
        description: "Use the final report PDF as the source material for certificate data.",
      },
      {
        step: "02",
        title: "Certificate Data",
        description: "Convert report contents into structured digital certificate data.",
      },
      {
        step: "03",
        title: "SBT Issuance",
        description: "Bind the certificate to the company smart account as a non-transferable SBT.",
      },
      {
        step: "04",
        title: "Public Verification",
        description: "Allow external parties to verify status, issuer, and ownership.",
      },
    ],
    features: {
      badge: "Platform",
      title: "Core Features",
      description: "Everything needed to issue, bind, and verify company-owned digital certificates.",
      items: [
        {
          title: "Report to Certificate Data",
          description: "Convert final report PDFs into structured digital certificate records.",
        },
        {
          title: "Company Smart Account",
          description: "Manage certificates through ERC-4337 company accounts, not individual wallets.",
        },
        {
          title: "Certificate SBT Issuance",
          description: "Issue non-transferable certificate SBTs bound to each company account.",
        },
        {
          title: "DID/VC Issuer Signature",
          description: "Sign certificate data with the issuer DID to make the origin verifiable.",
        },
        {
          title: "On-chain Registry",
          description: "Anchor certificate hashes, VC hashes, and lifecycle status on-chain.",
        },
        {
          title: "Public Verification",
          description: "Allow external parties to verify issuer, ownership, and current certificate status.",
        },
      ],
    },
    flow: {
      title: "Issuance Flow",
      steps: [
        {
          title: "Company Sign-in",
          description: "A company signs in and creates its ERC-4337 smart account.",
        },
        {
          title: "Report Upload",
          description: "The final report PDF is uploaded as source material.",
        },
        {
          title: "Certificate Data",
          description: "The report is converted into structured certificate data.",
        },
        {
          title: "VC & Registry",
          description: "The issuer signs the data and anchors key hashes on-chain.",
        },
        {
          title: "SBT Issuance",
          description: "A certificate SBT is issued to the company smart account.",
        },
        {
          title: "Public Verification",
          description: "External parties verify the certificate through SBT, registry, and VC data.",
        },
      ],
    },
    trust: {
      topTitle: "About CertSeal",
      topSubtitle: "A new way to issue, own, and verify digital certificates.",
      cardTitle: "From Static Reports to Digital Certificates",
      body: [
        "Traditional certificates are often issued as PDF files, shared manually, and verified through fragmented processes.",
        "CertSeal converts final report PDFs into structured digital certificate data, signs them with an issuer DID, and anchors their verification state in an on-chain registry.",
        "Each certificate is issued as a non-transferable SBT bound to a company smart account, allowing external parties to verify whether the company currently holds an active certificate from a trusted issuer.",
      ],
      layerTitle: "Trust Layer",
      layerDescription: "Issuer, ownership, and lifecycle status are verified through a blockchain-backed trust layer.",
      cards: [
        {
          title: "ERC-4337 Company Account",
          description: "A company smart account becomes the owner of issued certificate SBTs.",
        },
        {
          title: "Issuer DID / VC",
          description: "Certificate data is signed with the issuer DID to verify its origin.",
        },
        {
          title: "Certificate SBT",
          description: "Each certificate is bound to the company account as a non-transferable token.",
        },
        {
          title: "On-chain Registry",
          description: "Certificate hashes and lifecycle status are anchored on-chain.",
        },
      ],
    },
    contact: {
      title: "Get in touch",
      description:
        "Tell us if you need CertSeal issuing flows, company account integration, or public verification for your certificates.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Submit",
      info: {
        email: "Email",
        phone: "Sales",
        address: "Office",
        emailValue: "contact@certseal.io",
        phoneValue: "Demo request",
        addressValue: "Seoul, Korea",
      },
    },
    auth: {
      common: {
        brand: "CertSeal",
        companyAuthTitle: "Company-based authentication",
        companyAuthDescription: "Certificates are issued to a company smart account, not to an individual user wallet.",
        smartAccountCreated: "Company Smart Account created",
      },
      login: {
        title: "Welcome back",
        subtitle: "Sign in to manage company-bound digital certificates.",
        email: "Email",
        password: "Password",
        submit: "Sign in",
        google: "Continue with Google",
        forgot: "Forgot password?",
        createPrefix: "Don’t have an account?",
        createAccount: "Create one",
        description: "Your company account will be used to own and manage issued Certificate SBTs.",
      },
      register: {
        title: "Create company account",
        subtitle: "Register your company to issue and own digital certificate SBTs.",
        workEmail: "Work Email",
        password: "Password",
        companyName: "Company Name",
        managerName: "Manager Name",
        smartAccountTitle: "Company Smart Account",
        smartAccountDescription: "A smart account will be created automatically after registration.",
        technicalNote: "An ERC-4337 account is created internally. Users only register company details.",
        submit: "Create account",
        signInPrefix: "Already have an account?",
        signIn: "Sign in",
      },
      forgot: {
        title: "Reset your password",
        subtitle: "Enter your email and we’ll send a reset link.",
        email: "Email",
        submit: "Send reset link",
        back: "Back to sign in",
        successTitle: "Reset link sent",
        successDescription: "Check your inbox for password reset instructions.",
      },
      dashboard: {
        title: "Company Dashboard",
        subtitle: "Manage digital certificates bound to your company account.",
        company: "Company",
        manager: "Manager",
        smartAccount: "Company Smart Account",
        issuedCertificates: "Issued Certificates",
        issueFirst: "Issue First Certificate",
        signOut: "Sign out",
        emptyCompany: "A Company",
        ownershipNote: "Certificate SBT ownership is bound to this company smart account.",
      },
    },
  },
} as const

export type Dictionary = (typeof dictionaries)[Locale]

export function isLocale(value: string | null): value is Locale {
  return value === "ko" || value === "en"
}
