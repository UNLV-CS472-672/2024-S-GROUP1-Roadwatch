import { Schema, model, Types } from 'mongoose';

/** Defines fields that are applicable *only* to text-based posts (default). */
interface ITextPost {
  type: 'text';
}

/** Defines fields that are applicable *only* to marker-based posts. */
interface IMarkerPost {
  type: 'marker';
  marker: Types.ObjectId;
}

/** Defines the fields required for every post in the Community page. */
interface IUniversalPost {
  community: Types.ObjectId;
  user: Types.ObjectId;
  marker?: Types.ObjectId; // Only defining this here so it can also be defined in the Schema.
  likeCount?: number; // Optional because the default is zero.
  content: {
    title: string;
    body: string;
  };
}

/**
 * Defines the types for the `Post` model.
 *
 * If the value for `type` is set to `'marker'`, the field `marker` will
 * then become required.
 */
type TPostModel = IUniversalPost & (ITextPost | IMarkerPost);

const Post = new Schema<TPostModel>(
  {
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    content: {
      type: {
        title: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'marker'],
      required: true,
    },
    marker: {
      type: Schema.Types.ObjectId,
      ref: 'Marker',
      required: function () {
        return this.type === 'marker';
      },
    },
  },
  { timestamps: true }
);

export default model<TPostModel>('Post', Post);
