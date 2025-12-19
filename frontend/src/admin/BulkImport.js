import axios from '../api/axios';

export default function BulkImport() {
  const upload = async (dryRun) => {
    const file = document.querySelector('input').files[0];
    const form = new FormData();
    form.append('file', file);
    form.append('dryRun', dryRun);
    const res = await axios.post('/bulk-import', form);
    alert(JSON.stringify(res.data));
  };

  return (
    <div className="container">
      <h2>Bulk Import</h2>

      <input type="file" />
      <br /><br />

      <button onClick={() => upload(true)}>Dry Run</button>
      {' '}
      <button onClick={() => upload(false)}>Commit</button>
    </div>
  );

}
