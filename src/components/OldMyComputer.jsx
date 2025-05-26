import "../styles/MyComputer.css"

function MyComputer() {
  const drives = [
    { id: "c", name: "Local Disk (C:)", icon: "/drive.png", type: "Hard Disk", free: "1.2 GB", capacity: "2.0 GB" },
    { id: "a", name: "Floppy (A:)", icon: "/floppy.png", type: "Floppy Disk", free: "1.4 MB", capacity: "1.4 MB" },
    { id: "d", name: "CD-ROM (D:)", icon: "/cd-rom.png", type: "CD-ROM Drive", free: "0 MB", capacity: "650 MB" },
  ]

  return (
    <div className="my-computer">
      <div className="my-computer-header">
        <img src="/img/computer_explorer.ico" alt="My Computer" className="my-computer-icon" />
        <span className="my-computer-title">My Computer</span>
      </div>
      <div className="folder-view">
        {drives.map((drive) => (
          <div key={drive.id} className="folder-item">
            <img src={drive.icon || "/img/computer_explorer.ico"} alt={drive.name} className="folder-icon" />
            <div className="folder-details">
              <div className="folder-name">{drive.name}</div>
              <div className="folder-type">{drive.type}</div>
              <div className="folder-space">
                {drive.free} free of {drive.capacity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyComputer
