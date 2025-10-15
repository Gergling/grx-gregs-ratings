import { useImageLoadStatus } from "../hooks/use-image-load-status";
import { Box, CircularProgress, Fade } from "@mui/material";

type ImageLoaderProps = {
  children?: React.ReactElement;
  image: string | undefined;
};

export const ImageLoader = ({
  children,
  image,
}: ImageLoaderProps) => {
  const status = useImageLoadStatus(image);

  // TODO: Need to handle other statuses.
  if (status === 'loading' || status === 'idle') {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={30} />
      </Box>
    );
  }

  if (!children) return null;

  return (
    <Fade in={status === 'success'}>
      {children}
    </Fade>
  );
};
