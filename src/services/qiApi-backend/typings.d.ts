declare namespace API {
  type Assistant = {
    avatar?: string;
    createTime?: string;
    creator?: string;
    description?: string;
    detail?: string;
    exampleAnswer?: string;
    exampleQuestion?: string;
    id?: string;
    isDelete?: string;
    name?: string;
    prompt?: string;
    status?: string;
    type?: string;
    updateTime?: string;
  };

  type AssistantAddRequest = {
    avatar?: string;
    description?: string;
    detail?: string;
    exampleAnswer?: string;
    exampleQuestion?: string;
    name?: string;
    prompt?: string;
    type?: string;
  };

  type AssistantUpdateAvatarRequest = {
    avatar?: string;
    id?: string;
  };

  type AssistantUpdateRequest = {
    avatar?: string;
    creator?: string;
    description?: string;
    detail?: string;
    exampleAnswer?: string;
    exampleQuestion?: string;
    id?: string;
    name?: string;
    prompt?: string;
    status?: string;
    type?: string;
  };

  type AssistantVO = {
    avatar?: string;
    createTime?: string;
    creatorName?: string;
    description?: string;
    detail?: string;
    exampleAnswer?: string;
    exampleQuestion?: string;
    id?: string;
    name?: string;
    prompt?: string;
    status?: string;
    type?: string;
    updateTime?: string;
  };

  type BaseResponseAssistantVO = {
    code?: number;
    data?: AssistantVO;
    message?: string;
  };

  type BaseResponseBiResponse = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseImageVo = {
    code?: number;
    data?: ImageVo;
    message?: string;
  };

  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type BaseResponseIntroduceRowVO = {
    code?: number;
    data?: IntroduceRowVO;
    message?: string;
  };

  type BaseResponseListAssistant = {
    code?: number;
    data?: Assistant[];
    message?: string;
  };

  type BaseResponseListInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo[];
    message?: string;
  };

  type BaseResponseListInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO[];
    message?: string;
  };

  type BaseResponseListKeyVO = {
    code?: number;
    data?: KeyVO[];
    message?: string;
  };

  type BaseResponseListPost = {
    code?: number;
    data?: Post[];
    message?: string;
  };

  type BaseResponseListProductInfo = {
    code?: number;
    data?: ProductInfo[];
    message?: string;
  };

  type BaseResponseListUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo[];
    message?: string;
  };

  type BaseResponseListUserVO = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseobject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseOrderVo = {
    code?: number;
    data?: OrderVo;
    message?: string;
  };

  type BaseResponsePageAssistant = {
    code?: number;
    data?: PageAssistant;
    message?: string;
  };

  type BaseResponsePageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    message?: string;
  };

  type BaseResponsePagePost = {
    code?: number;
    data?: PagePost;
    message?: string;
  };

  type BaseResponsePageProductInfo = {
    code?: number;
    data?: PageProductInfo;
    message?: string;
  };

  type BaseResponsePageUserInterfaceInfo = {
    code?: number;
    data?: PageUserInterfaceInfo;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponsePost = {
    code?: number;
    data?: Post;
    message?: string;
  };

  type BaseResponseProductInfo = {
    code?: number;
    data?: ProductInfo;
    message?: string;
  };

  type BaseResponseProductOrderVo = {
    code?: number;
    data?: ProductOrderVo;
    message?: string;
  };

  type BaseResponseProportionSalesVO = {
    code?: number;
    data?: ProportionSalesVO;
    message?: string;
  };

  type BaseResponseSalesCardVO = {
    code?: number;
    data?: SalesCardVO;
    message?: string;
  };

  type BaseResponseTopInterfaceInfoVO = {
    code?: number;
    data?: TopInterfaceInfoVO;
    message?: string;
  };

  type BaseResponseUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    chartId?: string;
    genChart?: string;
    genResult?: string;
  };

  type closedProductOrderUsingPOSTParams = {
    /** orderNo */
    orderNo?: string;
  };

  type deleteProductOrderUsingPOSTParams = {
    /** id */
    id?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type delKeyByIdUsingPOSTParams = {
    /** id */
    id?: string;
  };

  type Field = {
    fieldName?: string;
    value?: string;
  };

  type genChartByAiUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type genChartByAiV1UsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type getAssistantByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getCaptchaUsingGETParams = {
    /** emailAccount */
    emailAccount?: string;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getPostByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getProductInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getProductOrderByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByInvitationCodeUsingPOSTParams = {
    /** invitationCode */
    invitationCode?: string;
  };

  type getUserInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserVoUsingGETParams = {
    /** id */
    id?: string;
  };

  type IdRequest = {
    id?: string;
  };

  type ImageVo = {
    name?: string;
    status?: string;
    uid?: string;
    url?: string;
  };

  type InterfaceInfo = {
    avatarUrl?: string;
    createTime?: string;
    description?: string;
    id?: string;
    isDelete?: number;
    method?: string;
    methodName?: string;
    name?: string;
    reduceScore?: number;
    requestExample?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    responseParams?: string;
    returnFormat?: string;
    sort?: string;
    status?: number;
    totalInvokes?: string;
    type?: string;
    updateTime?: string;
    url?: string;
    userId?: string;
  };

  type InterfaceInfoAddRequest = {
    description?: string;
    method?: string;
    methodName?: string;
    name?: string;
    reduceScore?: number;
    requestExample?: string;
    requestHeader?: string;
    requestParams?: RequestParamsField[];
    responseHeader?: string;
    responseParams?: ResponseParamsField[];
    returnFormat?: string;
    type?: string;
    url?: string;
  };

  type InterfaceInfoProportion = {
    name?: string;
    ratio?: number;
  };

  type InterfaceInfoTotalCountVO = {
    id?: string;
    name?: string;
    totalInvokes?: string;
  };

  type InterfaceInfoUpdateAvatarRequest = {
    avatarUrl?: string;
    id?: string;
  };

  type InterfaceInfoUpdateRequest = {
    avatarUrl?: string;
    description?: string;
    id?: string;
    method?: string;
    methodName?: string;
    name?: string;
    reduceScore?: number;
    requestExample?: string;
    requestHeader?: string;
    requestParams?: RequestParamsField[];
    responseHeader?: string;
    responseParams?: ResponseParamsField[];
    returnFormat?: string;
    status?: number;
    type?: string;
    url?: string;
  };

  type InterfaceInfoVO = {
    avatarUrl?: string;
    createTime?: string;
    description?: string;
    id?: string;
    isDelete?: number;
    method?: string;
    methodName?: string;
    name?: string;
    reduceScore?: number;
    requestExample?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    responseParams?: string;
    returnFormat?: string;
    sort?: string;
    status?: number;
    totalInvokes?: string;
    totalNum?: number;
    type?: string;
    updateTime?: string;
    url?: string;
    userId?: string;
  };

  type InterfaceLogWeekCount = {
    count?: string;
    day?: string;
  };

  type IntroduceRowVO = {
    dayOverDay?: string;
    dayTotal?: string;
    interfaceInfoCount?: string;
    noPayCount?: string;
    successPayCount?: string;
    sucessTotalAmount?: string;
    userCount?: string;
    weekOverWeek?: string;
  };

  type InvokeRequest = {
    id?: string;
    requestParams?: Field[];
    userRequestParams?: string;
  };

  type KeyVO = {
    createTime?: string;
    id?: string;
    keys?: string[];
    status?: string;
    userId?: string;
  };

  type listAssistantByPageUsingGETParams = {
    current?: string;
    description?: string;
    detail?: string;
    id?: string;
    name?: string;
    pageSize?: string;
    prompt?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    type?: string;
  };

  type listAssistantBySearchTextPageUsingGETParams = {
    current?: string;
    pageSize?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    type?: string;
  };

  type listAssistantUsingGETParams = {
    current?: string;
    description?: string;
    detail?: string;
    id?: string;
    name?: string;
    pageSize?: string;
    prompt?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    type?: string;
  };

  type listInterfaceInfoByPageUsingGETParams = {
    current?: string;
    description?: string;
    method?: string;
    name?: string;
    pageSize?: string;
    reduceScore?: number;
    'responseParams[0].desc'?: string;
    'responseParams[0].fieldName'?: string;
    'responseParams[0].id'?: string;
    'responseParams[0].type'?: string;
    returnFormat?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: string;
  };

  type listInterfaceInfoBySearchTextPageUsingGETParams = {
    current?: string;
    pageSize?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type listInterfaceInfoUsingGETParams = {
    current?: string;
    description?: string;
    method?: string;
    name?: string;
    pageSize?: string;
    reduceScore?: number;
    'responseParams[0].desc'?: string;
    'responseParams[0].fieldName'?: string;
    'responseParams[0].id'?: string;
    'responseParams[0].type'?: string;
    returnFormat?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: string;
  };

  type listPostByPageUsingGETParams = {
    age?: number;
    contact?: string;
    content?: string;
    current?: string;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    pageSize?: string;
    place?: string;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listPostUsingGETParams = {
    age?: number;
    contact?: string;
    content?: string;
    current?: string;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    pageSize?: string;
    place?: string;
    reviewStatus?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listProductInfoByPageUsingGETParams = {
    addPoints?: number;
    current?: string;
    description?: string;
    name?: string;
    pageSize?: string;
    productType?: string;
    sortField?: string;
    sortOrder?: string;
    total?: number;
  };

  type listProductInfoBySearchTextPageUsingGETParams = {
    current?: string;
    pageSize?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type listProductInfoUsingGETParams = {
    addPoints?: number;
    current?: string;
    description?: string;
    name?: string;
    pageSize?: string;
    productType?: string;
    sortField?: string;
    sortOrder?: string;
    total?: number;
  };

  type listProductOrderByPageUsingGETParams = {
    addPoints?: number;
    current?: string;
    orderName?: string;
    orderNo?: string;
    pageSize?: string;
    payType?: string;
    productInfo?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    total?: number;
  };

  type listUserByPageUsingGETParams = {
    createTime?: string;
    current?: string;
    email?: string;
    gender?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type listUserInterfaceInfoByPageUsingGETParams = {
    current?: string;
    id?: string;
    interfaceInfoId?: string;
    leftNum?: number;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: string;
  };

  type listUserInterfaceInfoUsingGETParams = {
    current?: string;
    id?: string;
    interfaceInfoId?: string;
    leftNum?: number;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: string;
  };

  type listUserUsingGETParams = {
    createTime?: string;
    current?: string;
    email?: string;
    gender?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type OrderVo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    optimizeJoinOfCountSql?: boolean;
    orders?: OrderItem[];
    records?: ProductOrderVo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageAssistant = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Assistant[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageInterfaceInfo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PagePost = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Post[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageProductInfo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: ProductInfo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserInterfaceInfo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserInterfaceInfo[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PayCreateRequest = {
    payType?: string;
    productId?: string;
  };

  type Post = {
    age?: number;
    contact?: string;
    content?: string;
    createTime?: string;
    education?: string;
    gender?: number;
    id?: string;
    isDelete?: number;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
    reviewMessage?: string;
    reviewStatus?: number;
    thumbNum?: number;
    updateTime?: string;
    userId?: string;
    viewNum?: number;
  };

  type PostAddRequest = {
    age?: number;
    contact?: string;
    content?: string;
    education?: string;
    gender?: number;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
  };

  type PostUpdateRequest = {
    age?: number;
    contact?: string;
    content?: string;
    education?: string;
    gender?: number;
    id?: string;
    job?: string;
    loveExp?: string;
    photo?: string;
    place?: string;
    reviewMessage?: string;
    reviewStatus?: number;
  };

  type ProductInfo = {
    addPoints?: number;
    createTime?: string;
    description?: string;
    expirationTime?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    productType?: string;
    status?: number;
    total?: number;
    updateTime?: string;
    userId?: string;
  };

  type ProductInfoAddRequest = {
    addPoints?: number;
    description?: string;
    expirationTime?: string;
    name?: string;
    productType?: string;
    total?: number;
  };

  type ProductInfoUpdateRequest = {
    addPoints?: number;
    description?: string;
    expirationTime?: string;
    id?: string;
    name?: string;
    productType?: string;
    total?: number;
  };

  type ProductOrderPayoutRank = {
    payOutRank?: string;
    sum?: number;
    userName?: string;
  };

  type ProductOrderQueryRequest = {
    addPoints?: number;
    current?: string;
    orderName?: string;
    orderNo?: string;
    pageSize?: string;
    payType?: string;
    productInfo?: string;
    sortField?: string;
    sortOrder?: string;
    status?: string;
    total?: number;
  };

  type ProductOrderTotalDay = {
    day?: string;
    total?: string;
  };

  type ProductOrderVo = {
    addPoints?: number;
    codeUrl?: string;
    createTime?: string;
    description?: string;
    expirationTime?: string;
    formData?: string;
    id?: string;
    orderName?: string;
    orderNo?: string;
    payType?: string;
    productId?: string;
    productInfo?: ProductInfo;
    productType?: string;
    status?: string;
    total?: string;
  };

  type ProportionSalesVO = {
    interfaceInfoProportionList?: InterfaceInfoProportion[];
  };

  type RequestParamsField = {
    desc?: string;
    fieldName?: string;
    id?: string;
    required?: string;
    type?: string;
  };

  type ResponseParamsField = {
    desc?: string;
    fieldName?: string;
    id?: string;
    type?: string;
  };

  type SalesCardVO = {
    payoutRank?: ProductOrderPayoutRank[];
    totalDay?: ProductOrderTotalDay[];
  };

  type TopInterfaceInfoVO = {
    interfaceInfoTotalCount?: InterfaceInfoTotalCountVO[];
    interfaceLogWeekCounts?: InterfaceLogWeekCount[];
    mostPopular?: string;
  };

  type uploadImgUsingPOSTParams = {
    biz?: string;
  };

  type UserAddRequest = {
    gender?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserBindEmailRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserEmailLoginRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserEmailRegisterRequest = {
    agreeToAnAgreement?: string;
    captcha?: string;
    emailAccount?: string;
    invitationCode?: string;
    userName?: string;
  };

  type UserInterfaceInfo = {
    createTime?: string;
    id?: string;
    interfaceInfoId?: string;
    isDelete?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    userId?: string;
  };

  type UserInterfaceInfoAddRequest = {
    interfaceInfoId?: string;
    leftNum?: number;
    totalNum?: number;
    userId?: string;
  };

  type UserInterfaceInfoUpdateRequest = {
    id?: string;
    leftNum?: number;
    status?: number;
    totalNum?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    invitationCode?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserUnBindEmailRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserUpdateAvatarRequest = {
    id?: string;
    userAvatar?: string;
  };

  type UserUpdateRequest = {
    balance?: number;
    gender?: string;
    id?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserVO = {
    balance?: number;
    createTime?: string;
    email?: string;
    gender?: string;
    id?: string;
    invitationCode?: string;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type wxLoginUsingGETParams = {
    /** code */
    code: string;
    /** state */
    state: string;
  };
}
