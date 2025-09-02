# 网页导航 API 服务

这是一个用Go语言编写的RESTful API服务，用于管理网站导航数据，使用MongoDB作为数据存储。

## 功能特性

- ✅ RESTful API设计
- ✅ MongoDB数据存储
- ✅ CORS跨域支持
- ✅ 网站CRUD操作
- ✅ 搜索功能
- ✅ 数据库初始化脚本

## 技术栈

- **后端框架**: Gin (Go)
- **数据库**: MongoDB
- **配置管理**: godotenv

## 快速开始

### 1. 环境准备

确保已安装：
- Go 1.21+
- MongoDB

### 2. 安装依赖

```bash
cd api
go mod tidy
```

### 3. 配置环境变量

复制环境变量模板：
```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=webshine_navigator
COLLECTION_NAME=sites
PORT=5010
```

### 4. 初始化数据库

运行初始化脚本导入现有数据：
```bash
cd scripts
go run init_db.go
```

### 5. 启动服务

```bash
go run main.go
```

服务将在 `http://localhost:5010` 启动。

## API 接口

### 基础信息

- **Base URL**: `http://localhost:5010/api/v1`
- **Content-Type**: `application/json`

### 端点列表

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/sites` | 获取所有网站或搜索网站 |
| GET | `/sites/:id` | 根据ID获取网站详情 |
| POST | `/sites` | 创建新网站 |
| PUT | `/sites/:id` | 更新网站信息 |
| DELETE | `/sites/:id` | 删除网站 |
| GET | `/health` | 健康检查 |

### 搜索网站

```bash
GET /api/v1/sites?q=搜索关键词
```

### 创建网站

```bash
POST /api/v1/sites
Content-Type: application/json

{
  "name": "网站名称",
  "description": "网站描述",
  "url": "https://example.com",
  "category": "分类",
  "tags": ["标签1", "标签2"],
  "rating": 5
}
```

### 更新网站

```bash
PUT /api/v1/sites/:id
Content-Type: application/json

{
  "name": "新的网站名称",
  "description": "新的描述"
}
```

## 数据模型

```json
{
  "id": "ObjectId",
  "name": "网站名称",
  "description": "网站描述", 
  "url": "网站链接",
  "category": "分类",
  "tags": ["标签数组"],
  "rating": 5
}
```

## 开发说明

### 项目结构

```
api/
├── config/          # 数据库配置
├── controllers/     # 控制器层
├── models/          # 数据模型
├── routes/          # 路由配置
├── scripts/         # 工具脚本
├── services/        # 业务逻辑层
├── main.go          # 程序入口
├── go.mod           # Go模块文件
└── .env.example     # 环境变量模板
```

### 部署

1. 构建可执行文件：
```bash
go build -o webshine-api main.go
```

2. 运行：
```bash
./webshine-api
```
