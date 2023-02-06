import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/users', async (_: Request, res: Response) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

app.post(`/signup`, async (req, res) => {
  const { name, email } = req.body;
  const result = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return res.json(result);
});

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    },
  });
  return res.json(result);
});

app.put('/post/:id/views', async (req, res) => {
  const { id } = req.params;
  const result = await prisma.post.update({
    where: {
      id: +id,
    },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });

  res.json(result);
});

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.update({
    where: {
      id: +id,
    },
    data: {
      published: true,
    },
  });

  res.json(result);
});

app.get('/user/:id/drafts', async (req, res) => {
  const { id } = req.params;

  const result = await prisma.user
    .findUnique({
      where: {
        id: +id,
      },
    })
    .posts({
      where: {
        published: false,
      },
    });

  res.json(result);
});

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.findUnique({
    where: {
      id: +id,
    },
  });

  res.json(result);
});

app.get('/feed', async (req, res) => {
  const { skip, take } = req.query;

  const result = await prisma.post.findMany({
    where: {
      published: true,
    },
    skip: Number(skip) || undefined,
    take: Number(take),
  });

  res.json(result);
});

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
