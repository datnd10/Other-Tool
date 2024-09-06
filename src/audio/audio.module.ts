import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioProcessor } from './audio.processor';
import { AudioConvertedListener } from './audio-convert-event';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'audio-queue',
        }),
    ],
    controllers: [AudioController],
    providers: [AudioProcessor, AudioConvertedListener],
})
export class AudioModule { }
