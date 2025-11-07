"use client";

import { Box, List, ListItem, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { getProfile } from "@/http/get-profile";

export const UserProfile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => await getProfile(),
  });

  const user = data?.user;

  return (
    <>
      {!isLoading && user && (
        <Box height={160}>
          <List dense>
            <ListItem>
              <Typography color="white">Nome: {user.name}</Typography>
            </ListItem>

            <ListItem>
              <Typography color="white">E-mail: {user.email}</Typography>
            </ListItem>

            {user.avatarUrl && (
              <ListItem>
                <Image
                  color="white"
                  src={user.avatarUrl}
                  alt="User Avatar"
                  width={40}
                  height={40}
                />
              </ListItem>
            )}

            <ListItem>
              <Typography color="white">
                Telefone 1: {user.phoneNumber1}
              </Typography>
            </ListItem>

            <ListItem>
              <Typography color="white">
                Telefone 2: {user.phoneNumber2}
              </Typography>
            </ListItem>

            <ListItem>
              <Typography color="white">Perfil: {user.userRole}</Typography>
            </ListItem>
          </List>
        </Box>
      )}

      {isLoading && (
        <Skeleton
          animation="wave"
          height={160}
        />
      )}
    </>
  );
};
