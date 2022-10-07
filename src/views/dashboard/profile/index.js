import { Avatar, Box, Center, CircularProgress, Flex, Image, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain";
import Navbar from "components/dashboard/Navbar"
import EmptyComponent from "components/EmptyComponent";
import { useEffect, useState } from "react";
import { FiCalendar, FiCircle, FiCreditCard, FiEdit, FiEye, FiFile, FiFileText, FiHeart, FiMail, FiMap, FiMapPin, FiPlusCircle, FiUser } from "react-icons/fi";
import apiDoctor from "services/apiDoctor";
import colors from "values/colors";
import DetailProfile from "./components/DetailProfile";
import DetailSubProfile from "./components/DetailSubProfile";
import EducationalBackground from "./components/EducationalBackground";
import ExperienceHistory from "./components/ExperienceHistory";

const ProfilePage = () => {
  const [profileDetail, setProfileDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const getProfileDetail = () => {
    setIsLoading(true)
    apiDoctor.getDetail().then(r => {
      console.log("PROFILE", r)
      setProfileDetail(r)
      setIsLoading(false)
    }).catch(r => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    if (!profileDetail) {
      getProfileDetail()
    }
  }, [profileDetail])

  return (
    <Stack>
      <Box>
        <Navbar />
      </Box>
      {isLoading
        ? <Center><CircularProgress isIndeterminate size='100px' thickness='4px' /></Center>
        : <Stack padding={"0 48px"}>
          <Box>
            <Image
              src={'/img/bg-profile.png'}
              cursor={'pointer'}
              width={'100%'}
              maxH={'317px'}
              objectFit={'cover'}
              borderRadius={'10px'}
            />
          </Box>
          <DetailProfile profileDetail={profileDetail} />
          <DetailSubProfile profileDetail={profileDetail} />
          {/* <ExperienceHistory />
          <EducationalBackground /> */}
        </Stack>}
    </Stack>
  )
}

export default ProfilePage