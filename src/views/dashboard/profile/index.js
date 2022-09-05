import { Avatar, Box, Center, Flex, Image, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain";
import Navbar from "components/dashboard/Navbar"
import EmptyComponent from "components/EmptyComponent";
import { FiCalendar, FiCircle, FiCreditCard, FiEdit, FiEye, FiFile, FiFileText, FiHeart, FiMail, FiMap, FiMapPin, FiPlusCircle, FiUser } from "react-icons/fi";
import colors from "values/colors";
import DetailProfile from "./components/DetailProfile";
import DetailSubProfile from "./components/DetailSubProfile";
import EducationalBackground from "./components/EducationalBackground";
import ExperienceHistory from "./components/ExperienceHistory";

const ProfilePage = () => {
  return (
    <Stack>
      <Box>
        <Navbar />
      </Box>
      <Stack padding={"0 48px"}>
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
        <DetailProfile />
        <DetailSubProfile />
        <ExperienceHistory />
        <EducationalBackground />
      </Stack>
    </Stack>
  )
}

export default ProfilePage