import { Typography } from "@gergling/ui-components";
import { useState, useEffect } from "react";
import { Box, Card, CardHeader, CardMedia, CircularProgress, Fade } from "@mui/material";
import imageAngry from "../../../assets/images/team-greg-angry.jpg";
import imageDisgusted from "../../../assets/images/team-greg-disgusted.jpg";
import imageFearful from "../../../assets/images/team-greg-fearful.jpg";
import imageInvisible from "../../../assets/images/team-greg-invisible.jpg";
import imageJoyful from "../../../assets/images/team-greg-joyful.jpg";
import imagePretentious from "../../../assets/images/team-greg-pretentious.jpg";
import imageStandard from "../../../assets/images/team-greg-standard.jpg";

type MemberProps = {
  image: string;
  label: string;
};

const members: MemberProps[] = [
  {
    image: imageStandard,
    label: "Greg"
  },
  {
    image: imageJoyful,
    label: "Joyful Greg"
  },
  {
    image: imageFearful,
    label: "Fearful Greg"
  },
  {
    image: imageAngry,
    label: "Angry Greg"
  },
  {
    image: imageDisgusted,
    label: "Disgusted Greg"
  },
  {
    image: imagePretentious,
    label: "Pretentious Greg"
  },
  {
    image: imageInvisible,
    label: "Invisible Greg"
  },
];

const MemberCard = ({ image, label }: MemberProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setIsLoaded(true);
    // TODO: Could do with a refactor TBH.
    // img.onerror = () => setIsLoaded(true);
  }, [image]);

  return (
    <Card sx={{ width: 200 }}>
      <Box sx={{ height: 140, position: 'relative' }}>
        {!isLoaded && (
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
        )}
        <Fade in={isLoaded}>
          <CardMedia sx={{ height: 140 }} image={image} title={label} />
        </Fade>
      </Box>
      <CardHeader
        slotProps={{
          title: {
            sx: {
              fontSize: '1rem',
              fontWeight: '1000',
            },
            variant: 'h6',
          }
        }}
        title={label}
      />
    </Card>
  );
};

export const Team = () => {
  return (
    <>
      <Typography
        gutterBottom
        style={{ textAlign: "center", fontWeight: "bold" }}
        variant="h3"
      >Meet the Team</Typography>
      <Typography
        gutterBottom
        variant="body1"
      >
        We at Gregory, Michael & Davies pride ourselves on being at least one real person* and the voices in their head.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        {members.map((member) => (
          <MemberCard key={member.label} {...member} />
        ))}
      </Box>
      <Typography
        gutterBottom
        variant="body2"
      >
        *If you or a loved one is a real person, please seek assistance from a medical professional.
      </Typography>
    </>
  );
};
