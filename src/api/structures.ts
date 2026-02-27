export type ApiImage = {
  id: number;
  uploaderId: number;
  uploadedTimestamp: Date;
  size: number;
  width: number;
  height: number;
  views: number;
  downloads: number;
  visibility: number;
  hideUploader: number;
  title: string;
  description: string;
  filename: string;
  storage: {
    bucket: string;
    filename: string;
  };
  autodeleteTimestamp: Date | null;
  application: string;
  favorite: boolean;
  folderId: number;
  explosion: number;
  explosionUserViews: number;
  explosionUserDuration: number;
  explosionGlobalViews: number;
  explosionAction: number;
  nsfw: number;
  shareId: number;
  shareCode: string;
  likeCount: number;
  commentCount: number;
};

export type ApiComment = {
  id: number;
  userId: number;
  referenceType: number;
  referenceId: number;
  content: string;
  createdTimestamp: Date;
  parentId: number | null;
  likeCount: number;
};
