import { Injectable } from '@nestjs/common';
import { Exception, ExceptionsType } from 'src/exceptions/newException';
import { CreateStreamingDto } from 'src/streaming/dto/create-streaming.dto';
import { UpdateStreamingDto } from 'src/streaming/dto/update-streaming.dto';
import { StreamingEntity } from 'src/streaming/entities/streaming.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StreamingRepository {
  private movieSelect = {
    id: true,
    name: true,
    imageUrl: true,
    ageRating: true,
    releaseYear: true,
    stream: true,
    genres: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStreamingDto): Promise<StreamingEntity> {
    try {
      const { name, price } = dto;
      const createdStreaming = await this.prisma.streaming.create({
        data: {
          name,
          price,
        },
      });
      return createdStreaming;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Error creating streaming',
      );
    }
  }

  async findAll(): Promise<StreamingEntity[]> {
    try {
      const streamings = await this.prisma.streaming.findMany();
      return streamings;
    } catch (error) {
      throw new Exception(ExceptionsType.DATABASE);
    }
  }

  async findById(id: string): Promise<StreamingEntity> {
    try {
      const streaming = await this.prisma.streaming.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          name: true,
          price: true,
          movies: {
            select: this.movieSelect,
          },
        },
      });
      return streaming;
    } catch (error) {
      throw new Exception(ExceptionsType.NOTFOUND, error.message);
    }
  }

  async findByName(name: string): Promise<StreamingEntity> {
    const streaming = await this.prisma.streaming.findUnique({
      where: { name },
    });

    return streaming;
  }

  async update(id: string, dto: UpdateStreamingDto): Promise<StreamingEntity> {
    try {
      const { name, price } = dto;
      const updatedStreaming = await this.prisma.streaming.update({
        where: { id },
        data: {
          name,
          price,
        },
        select: {
          id: true,
          name: true,
          price: true,
          movies: {
            select: this.movieSelect,
          },
        },
      });
      return updatedStreaming;
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Error updating streaming',
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.streaming.delete({ where: { id } });
    } catch (error) {
      throw new Exception(
        ExceptionsType.INVALIDDATA,
        'Error deleting streaming',
      );
    }
  }
}
