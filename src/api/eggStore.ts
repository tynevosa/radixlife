import radixLife from "../utils/axios";

export const fetchRemainingEggsCount = async (): Promise<number> => {
  try {
    const res = await radixLife.get('/eggs_countdown.php');
    return res.data['remaining_eggs'] as number;
  } catch (err) {
    return 0;
  }
}