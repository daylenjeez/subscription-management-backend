export enum ServiceType {
	// 娱乐相关
	VIDEO = "VIDEO", // 影视服务（Netflix, Disney+, 爱奇艺会员）
	GAME = "GAME", // 游戏服务（Nintendo Online, PS Plus, Steam）
	MUSIC = "MUSIC", // 音乐服务（Spotify, Apple Music, 网易云音乐）
	READING = "READING", // 阅读服务（Kindle Unlimited, 微信读书）

	// 工具相关
	CLOUD = "CLOUD", // 云服务（iCloud, Google One）
	DEVELOPMENT = "DEVELOPMENT", // 开发工具（JetBrains, Github Copilot）
	DESIGN = "DESIGN", // 设计工具（Figma, Adobe CC）
	PRODUCTIVITY = "PRODUCTIVITY", // 生产力工具（Notion, Office 365）

	// 生活服务
	LIFESTYLE = "LIFESTYLE", // 生活服务（健身房会员，瑜伽课程）
	INTERNET = "INTERNET", // 网络服务（宽带，手机套餐）
	MEMBERSHIP = "MEMBERSHIP", // 会员服务（商场会员，迪士尼年卡）
	EDUCATION = "EDUCATION", // 教育服务（Coursera, Udemy, 线下课程）

	// 自定义
	CUSTOM = "CUSTOM", // 其他自定义服务
}

//货币
//人民币，美元，欧元,日元，土耳其，韩元
export enum Currency {
	CNY = "CNY",
	USD = "USD",
	EURO = "EURO",
	JPY = "JPY",
	TRY = "TRY",
	KRW = "KRW",
}

// 订阅状态
export enum SubscriptionStatus {
	ACTIVE = "ACTIVE", // 活跃中
	ENDED = "ENDED", // 已结束（包含过期和取消的情况）
}
