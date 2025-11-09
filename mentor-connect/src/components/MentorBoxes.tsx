export type Mentor = {
  name: string;
  title?: string;
  id?: string;
};

/**
 *  careerFields: String[]
+location: String
+experience: Number
+bio: String

 */

type Props = {
  mentor: Mentor;
  onClick?: (mentor: Mentor) => void;
};

export default function MentorBoxes({ mentor, onClick}: Props) {
  return (
    <div className="mentor-box">
      <h3 className="mentor-name">{mentor.name}</h3>
      <p className="mentor-career">{mentor.title}</p>
    </div>
  )
}

