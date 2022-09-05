import { Avatar, Box, Button, Center, Checkbox, Divider, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import ButtonMain from "components/button/ButtonMain";
import Navbar from "components/dashboard/Navbar"
import EmptyComponent from "components/EmptyComponent";
import ReactDatePicker from "react-datepicker";
import { FiCalendar, FiCircle, FiCreditCard, FiEdit, FiEye, FiFile, FiFileText, FiHeart, FiMail, FiMap, FiMapPin, FiPlusCircle, FiUser, FiXCircle } from "react-icons/fi";
import colors from "values/colors";

function MouseOver(event, id) {
  document.getElementById(id).style.display = 'flex'
}
function MouseOut(event, id) {
  document.getElementById(id).style.display = 'none'
}

const ModalFormEducational = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <form>
            <Stack p={'20px'}>
              <Flex alignItems={'center'} pb={4}>
                <Text flex={1} fontSize={'24px'} color={colors.PRIMARY}>Pendidikan</Text>
                <Box onClick={onClose} cursor='pointer'><FiXCircle fontSize={'24px'} /></Box>
              </Flex>
              <Box>
                <Divider />
              </Box>
              <Stack pt={4} gap={2}>
                <Box><Input placeholder='Institusi' size='lg' /></Box>
                <Box><Input placeholder='Gelar' size='lg' /></Box>
                <Box><Input placeholder='Bidang studi' size='lg' /></Box>
                <Box><Input placeholder='Spesialis/umum (cth : umum/spesialis kandungan)' size='lg' /></Box>
                <Stack>
                  <Box>Mulai belajar pada</Box>
                  <Flex gap={3}>
                    <Box flex={1}>
                      <Select placeholder='Bulan'>
                        {monthList.map((r) => (
                          <option value={r}>{r}</option>
                        ))}
                      </Select>
                    </Box>
                    <Box flex={1}>
                      <Select placeholder='Tahun'>
                        {generateYearOptions()}
                      </Select>
                    </Box>
                  </Flex>
                </Stack>
                <Stack>
                  <Box>Berakhir belajar pada</Box>
                  <Flex gap={3}>
                    <Box flex={1}>
                      <Select placeholder='Bulan'>
                        {monthList.map((r) => (
                          <option value={r}>{r}</option>
                        ))}
                      </Select>
                    </Box>
                    <Box flex={1}>
                      <Select placeholder='Tahun'>
                        {generateYearOptions()}
                      </Select>
                    </Box>
                  </Flex>
                </Stack>
                <Box>
                  <Checkbox defaultChecked>Saya masih menempuh pendidikan di tempat ini</Checkbox>
                </Box>
                <Box>
                  <Textarea type={'textarea'} placeholder='Informasi tambahan (opsional)' size='lg' />
                </Box>
                <Flex justifyContent={'end'} gap={3}>
                  <Box>
                    <ButtonMain w={'120px'} bg="white" color={colors.PRIMARY}>Batal</ButtonMain>
                  </Box>
                  <Box>
                    <ButtonMain w={'120px'}><FiEdit /> Simpan</ButtonMain>
                  </Box>
                </Flex>
              </Stack>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const EducationalBackground = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Stack pt={12} pb={8}>
        <Flex alignItems={'center'} borderBottom={'1px solid #C4C4C4'} pb={2}>
          <Text flex={1} fontSize={'24px'} color={colors.PRIMARY}>Pendidikan</Text>
          <Box>
            <ButtonMain borderRadius={'5px'} fontSize={'18px'} bg="white" color={colors.PRIMARY} onClick={onOpen}><FiPlusCircle /> Pendidikan</ButtonMain>
          </Box>
        </Flex>
        {pengpend.length > 0 ?
          <Flex pt={4} flexWrap='wrap' gap={8} >
            <Stack flex={2.5} />
            <Stack flex={3}>
              {pengpend.map((r, i) => (
                <Flex key={i} gap={4} lineHeight={'16px'} pb={2} onMouseOut={(e) => MouseOut(e, r.id)} onMouseOver={(e) => MouseOver(e, r.id)}>
                  <Box pt={'4px'}><FiCircle fill="black" /></Box>
                  <Stack flex={1}>
                    <Text fontWeight={'bold'}>{r.title}</Text>
                    <Text color={'#505050'}>{r.subtitle}</Text>
                    <Text color={'#505050'}>{r.caption}</Text>
                  </Stack>
                  <Flex gap={3} id={r.id} display='none' cursor={'pointer'}>
                    <Flex alignItems={'center'}>
                      <Box><FiEdit fontSize={'18px'} color={colors.PRIMARY} /></Box>
                      <Box fontSize={'18px'} color={colors.PRIMARY}>Edit</Box>
                    </Flex>
                    <Flex alignItems={'center'}>
                      <Box flex={1}><FiEdit fontSize={'18px'} color='red' /></Box>
                      <Box flex={1} fontSize={'18px'} color='red'>Hapus</Box>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </Flex>
          :
          <Center minH={'300px'}>
            <EmptyComponent
              src={'/img/empty-state-pengalaman.svg'}
              caption={'Pengalaman kerja belum ada'}
            />
          </Center>
        }
      </Stack>
      <ModalFormEducational onClose={onClose} isOpen={isOpen} />
    </>
  )
}

export default EducationalBackground


const pengpends = []

const pengpend = [
  {
    id: 1,
    title: 'KLINIK CITRA MEDIKA 1 & 2 AGUSTUS 2016',
    subtitle: 'MARET  2017',
    caption: '(bekerja sebagai dokter umum di klinik tersebut )'
  },
  {
    id: 2,
    title: 'KLINIK CITRA MEDIKA 1 & 2 AGUSTUS 2016',
    subtitle: 'MARET  2017',
    caption: '(bekerja sebagai dokter umum di klinik tersebut )'
  },
  {
    id: 3,
    title: 'KLINIK CITRA MEDIKA 1 & 2 AGUSTUS 2016',
    subtitle: 'MARET  2017',
    caption: '(bekerja sebagai dokter umum di klinik tersebut )'
  },
  {
    id: 4,
    title: 'KLINIK CITRA MEDIKA 1 & 2 AGUSTUS 2016',
    subtitle: 'MARET  2017',
    caption: '(bekerja sebagai dokter umum di klinik tersebut )'
  },
  {
    id: 5,
    title: 'KLINIK CITRA MEDIKA 1 & 2 AGUSTUS 2016',
    subtitle: 'MARET  2017',
    caption: '(bekerja sebagai dokter umum di klinik tersebut )'
  },
]


const monthList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const generateYearOptions = () => {
  const arr = [];

  const startYear = 1900;
  const endYear = new Date().getFullYear();

  for (let i = endYear; i >= startYear; i--) {
    arr.push(<option value={i}>{i}</option>);
  }

  return arr;
};