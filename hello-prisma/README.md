# Prisma学习

- 创建数据库：`npx prisma migrate dev --name init ` 这里用的是 mac 自带的 `sqlite` 服务
- 执行脚本插入数据 `npx ts-node ./prisma/seed.ts`