import React, {useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import {PiCalendarDotsLight, PiRepeatLight, PiBell} from 'react-icons/pi';
import {FaChevronDown} from 'react-icons/fa';
import {formateDate} from '../../../utils/formatDate';
import {useNavigate} from 'react-router-dom';

const AddTask = () => {
  const navigate = useNavigate();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [dueDateTime, setDueDateTime] = useState({dateTime: '', timezone});
  const [reminderDateTime, setReminderDateTime] = useState({dateTime: '', timezone});
  const [recurrence, setRecurrence] = useState({
    // recurrenceType: 'Weekly',
    intervalType: 'Weeks',
    interval: 0,
    weekDays: [],
  });
  const weekDayMap = {
    Mo: 'Monday',
    Tu: 'Tuesday',
    We: 'Wednesday',
    Th: 'Thursday',
    Fr: 'Friday',
    Sa: 'Saturday',
    Su: 'Sunday',
  };

  const handleAddTask = () => {
    if (newTaskTitle) {
      console.log({newTaskTitle, dueDateTime, reminderDateTime, recurrence});
    }
    navigate('/');
  };

  return (
    <Card mb={3}>
      <CardBody mb={-2}>
        <Stack>
          <Input
            variant="unstyled"
            placeholder="Add a task"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
          />
          <Divider />
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex>
              <Popover>
                <PopoverTrigger>
                  <Button variant={'outline'} size={'sm'} mr={2}>
                    <PiCalendarDotsLight />
                    <Text ml={2}>
                      {dueDateTime.dateTime
                        ? formateDate(new Date(dueDateTime.dateTime))
                        : 'Add due date'}
                    </Text>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />

                  <PopoverBody>
                    <Input
                      type="date"
                      placeholder="Add custom date"
                      value={dueDateTime.dateTime}
                      onChange={e => setDueDateTime({...dueDateTime, dateTime: e.target.value})}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <Button variant={'outline'} size={'sm'} mr={2}>
                    <PiBell />
                    <Text ml={2}>
                      {reminderDateTime.dateTime
                        ? formateDate(new Date(reminderDateTime.dateTime), {time: true})
                        : 'Add reminderDateTime'}
                    </Text>
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <Input
                    type="datetime-local"
                    placeholder="Add custom date"
                    value={reminderDateTime.dateTime}
                    onChange={e =>
                      setReminderDateTime({...reminderDateTime, dateTime: e.target.value})
                    }
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <Button variant={'outline'} size={'sm'} mr={2}>
                    <PiRepeatLight />
                    <Text ml={2}>{!recurrence ? recurrence : 'Repeat task'}</Text>
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <Flex direction={'column'}>
                    <Flex justifyContent={'space-between'}>
                      <NumberInput min={0} defaultValue={1} size={'sm'}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<FaChevronDown />}
                          size={'sm'}
                          variant={'outlined'}
                        >
                          {recurrence.intervalType}
                        </MenuButton>
                        <MenuList
                          onClick={e =>
                            setRecurrence({
                              ...recurrence,
                              intervalType: e.target.value,
                              weekDays: e.target.value === 'Weeks' ? recurrence.weekDays : [],
                            })
                          }
                        >
                          <MenuItem value={'Days'}>Days</MenuItem>
                          <MenuItem value={'Weeks'}>Weeks</MenuItem>
                          <MenuItem value={'Months'}>Months</MenuItem>
                          <MenuItem value={'Years'}>Years</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                    {recurrence.intervalType === 'Weeks' && (
                      <Flex justifyContent={'space-between'} border="1px solid #e2e8f0" mt={2}>
                        {Object.keys(weekDayMap).map((d, index) => (
                          <Box
                            key={index}
                            p={2}
                            cursor={'pointer'}
                            onClick={() => {
                              if (recurrence.weekDays.includes(weekDayMap[d])) {
                                setRecurrence({
                                  ...recurrence,
                                  weekDays: recurrence.weekDays.filter(w => w !== weekDayMap[d]),
                                });
                              } else {
                                setRecurrence({
                                  ...recurrence,
                                  weekDays: [...recurrence.weekDays, weekDayMap[d]],
                                });
                              }
                            }}
                            background={
                              recurrence.weekDays.includes(weekDayMap[d]) ? 'blue.200' : 'white'
                            }
                          >
                            {d}
                          </Box>
                        ))}
                      </Flex>
                    )}
                  </Flex>
                </PopoverContent>
              </Popover>
            </Flex>
            <Button
              variant="solid"
              colorScheme="blue"
              size="sm"
              isDisabled={!newTaskTitle}
              onClick={handleAddTask}
            >
              Add
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default AddTask;
